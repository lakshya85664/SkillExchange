const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");
const RequestModel = require("../models/RequestModel");
const { getIO } = require("../socketService");
const SubCategoryModel = require("../models/SubCategoryModel");
const SkillModel = require("../models/SkillModel");
const {
  sendingMail,
  sendInactiveUserNotification,
  sendMatchCreatedNotification,
  sendMatchCompletedNotification
} = require("../utils/MailUtils");

module.exports = {
  createMatch: async (req, res) => {
    try {
      const { requesterId, receiverId, skillName } = req.body;

      // Validate input
      if (!requesterId || !receiverId || !skillName) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if users exist
      const requester = await UserModel.findById(requesterId);
      const receiver = await UserModel.findById(receiverId);
      if (!requester || !receiver) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check for existing match
      const existingMatch = await MessageModel.findOne({
        $or: [
          { requester: requesterId, receiver: receiverId },
          { requester: receiverId, receiver: requesterId }
        ],
        skillsExchanged: skillName
      });

      if (existingMatch) {
        return res.status(409).json({ message: "Match already exists" });
      }

      // Create new match
      const newMatch = new MessageModel({
        requester: requesterId,
        requesterName: requester.userName,
        requesterSkills: requester.skills,
        receiver: receiverId,
        receiverName: receiver.userName,
        receiverSkills: receiver.skills,
        skillsExchanged: [skillName],
        status: 'accepted',
        matchedAt: new Date()
      });

      await newMatch.save();

      res.status(201).json({
        message: "Match created successfully",
        data: newMatch
      });
    } catch (error) {
      console.error("Error creating match:", error);
      res.status(500).json({
        message: "Failed to create match",
        error: error.message
      });
    }
  },

  getUserMatches: async (req, res) => {
    try {
      const userId = req.params.userId;

      const matches = await MessageModel.find({
        $or: [
          { requester: userId },
          { receiver: userId }
        ],
        status: 'accepted'
      })
        .populate('requester', 'userName profilePic skills')
        .populate('receiver', 'userName profilePic skills')
        .sort({ matchedAt: -1 });

      res.status(200).json({
        message: "Matches retrieved successfully",
        data: matches
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  checkAndCreateMatch: async (req, res) => {
    try {
      const { requestId } = req.body;

      if (!requestId) {
        return res.status(400).json({ message: "requestId is required" });
      }

      console.log(`Checking for match with requestId: ${requestId}`);

      // Find the original request with populated users
      const request = await RequestModel.findById(requestId)
        .populate('senderId', 'userName skills')
        .populate('receiverId', 'userName skills');

      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }

      if (request.status !== 'Accepted') {
        return res.status(200).json({
          message: "No match created - request not accepted",
          data: null
        });
      }

      console.log(`Finding reciprocal accepted request where:
           senderId: ${request.receiverId._id} (originally receiver)
           receiverId: ${request.senderId._id} (originally sender)`);

      // Find any accepted request where the users are reversed
      const reciprocalRequest = await RequestModel.findOne({
        senderId: request.receiverId._id,
        receiverId: request.senderId._id,
        status: 'Accepted'
      }).populate('senderId', 'userName skills')
        .populate('receiverId', 'userName skills');

      if (!reciprocalRequest) {
        console.log('No reciprocal request found');
        return res.status(200).json({
          message: "No match created - no reciprocal request found",
          data: null
        });
      }

      console.log(`Found reciprocal request with skill: ${reciprocalRequest.skillName}`);

      // Check if match already exists for these users
      const existingMatch = await MessageModel.findOne({
        $or: [
          {
            requester: request.senderId._id,
            receiver: request.receiverId._id
          },
          {
            requester: request.receiverId._id,
            receiver: request.senderId._id
          }
        ]
      });

      if (existingMatch) {
        console.log('Match already exists between these users');
        return res.status(200).json({
          message: "Match already exists",
          data: existingMatch
        });
      }

      // Create new match with both skills
      const newMatch = new MessageModel({
        requester: request.senderId._id,
        requesterName: request.senderId.userName,
        requesterSkills: request.senderId.skills,
        requesterSkillOffered: reciprocalRequest.skillName, // Skill user is offering
        receiver: request.receiverId._id,
        receiverName: request.receiverId.userName,
        receiverSkills: request.receiverId.skills,
        receiverSkillOffered: request.skillName, // Skill user is offering
        skillsExchanged: [request.skillName, reciprocalRequest.skillName],
        status: 'accepted',
        matchedAt: new Date()
      });

      await newMatch.save();
      console.log('New match created with both skills:', {
        skill1: request.skillName,
        skill2: reciprocalRequest.skillName
      });

      // Send notifications to both users
      try {
        // Get user emails
        const requester = await UserModel.findById(request.senderId._id);
        const receiver = await UserModel.findById(request.receiverId._id);

        // Send email to requester
        await sendMatchCreatedNotification(
          requester.email,
          requester.userName,
          receiver.userName,
          reciprocalRequest.skillName,
          request.skillName
        );

        // Send email to receiver
        await sendMatchCreatedNotification(
          receiver.email,
          receiver.userName,
          requester.userName,
          request.skillName,
          reciprocalRequest.skillName
        );
      } catch (emailError) {
        console.error("Error sending match creation emails:", emailError);
      }

      return res.status(201).json({
        message: "Match created successfully with both skills",
        data: newMatch
      });
    } catch (error) {
      console.error("Error in checkAndCreateMatch:", error);
      res.status(500).json({
        message: "Failed to check/create match",
        error: error.message
      });
    }
  },
  // markSkillExchangeCompleted: async (req, res) => {
  //   try {
  //     const { matchId, userId } = req.body;
  //     const io = getIO();

  //     // Find the match
  //     const match = await MessageModel.findById(matchId);

  //     if (!match) {
  //       return res.status(404).json({ message: "Match not found" });
  //     }

  //     // Check if this user is part of this match
  //     if (![match.requester.toString(), match.receiver.toString()].includes(userId)) {
  //       return res.status(403).json({ message: "Not authorized for this match" });
  //     }

  //     // Check if already completed
  //     if (match.status === 'completed') {
  //       return res.status(200).json({ 
  //         message: "Skill exchange already completed",
  //         data: match
  //       });
  //     }

  //     // First user confirms
  //     if (!match.completedAt) {
  //       match.completedAt = new Date();
  //       await match.save();

  //       // Notify the other user
  //       io.to(matchId).emit('skillExchangeCompletionRequest', {
  //         matchId,
  //         initiatorId: userId
  //       });

  //       return res.status(200).json({
  //         message: "Waiting for the other user to confirm",
  //         data: match
  //       });
  //     }

  //     // Second user confirms - mark as completed
  //     match.status = 'completed';
  //     await match.save();

  //     // Notify both users
  //     io.to(matchId).emit('skillExchangeConfirmed', {
  //       matchId,
  //       confirmedBy: userId
  //     });

  //     return res.status(200).json({
  //       message: "Skill exchange marked as completed",
  //       data: match
  //     });

  //   } catch (error) {
  //     console.error("Error marking skill exchange as complete:", error);
  //     res.status(500).json({
  //       message: "Failed to mark skill exchange as complete",
  //       error: error.message
  //     });
  //   }
  // },

  //   markSkillExchangeCompleted: async (req, res) => {
  //     try {
  //         const { matchId, userId } = req.body;
  //         const io = getIO();

  //         // Find the match
  //         const match = await MessageModel.findById(matchId);

  //         if (!match) {
  //             return res.status(404).json({ message: "Match not found" });
  //         }

  //         // Check if this user is part of this match
  //         if (![match.requester.toString(), match.receiver.toString()].includes(userId)) {
  //             return res.status(403).json({ message: "Not authorized for this match" });
  //         }

  //         // Check if already completed
  //         if (match.status === 'completed') {
  //             return res.status(200).json({ 
  //                 message: "Skill exchange already completed",
  //                 data: match
  //             });
  //         }

  //         // First user confirms
  //         if (!match.completedAt) {
  //             match.completedAt = new Date();
  //             await match.save();

  //             // Notify the other user
  //             io.to(matchId).emit('skillExchangeCompletionRequest', {
  //                 matchId,
  //                 initiatorId: userId
  //             });

  //             return res.status(200).json({
  //                 message: "Waiting for the other user to confirm",
  //                 data: match
  //             });
  //         }

  //         // Second user confirms - mark as completed
  //         match.status = 'completed';
  //         await match.save();

  //         // Determine which skill each user learned
  //         const requesterLearnedSkill = match.receiverSkillOffered;
  //         const receiverLearnedSkill = match.requesterSkillOffered;

  //         try {
  //             // Add the learned skill to the requester's profile
  //             await axios.post('/skill/addskill', {
  //                 userId: match.requester,
  //                 name: requesterLearnedSkill,
  //                 // You may want to add category/subcategory info if available
  //                 // categoryId: ...,
  //                 // subcategoryId: ...
  //             });

  //             // Add the learned skill to the receiver's profile
  //             await axios.post('/skill/addskill', {
  //                 userId: match.receiver,
  //                 name: receiverLearnedSkill,
  //                 // You may want to add category/subcategory info if available
  //                 // categoryId: ...,
  //                 // subcategoryId: ...
  //             });
  //         } catch (skillError) {
  //             console.error("Error adding learned skills:", skillError);
  //             // Don't fail the whole operation if skill addition fails
  //         }

  //         // Notify both users
  //         io.to(matchId).emit('skillExchangeConfirmed', {
  //             matchId,
  //             confirmedBy: userId
  //         });

  //         return res.status(200).json({
  //             message: "Skill exchange marked as completed and skills added to profiles",
  //             data: match
  //         });

  //     } catch (error) {
  //         console.error("Error marking skill exchange as complete:", error);
  //         res.status(500).json({
  //             message: "Failed to mark skill exchange as complete",
  //             error: error.message
  //         });
  //     }
  // },

  // markSkillExchangeCompleted: async (req, res) => {
  //   try {
  //     const { matchId, userId } = req.body;
  //     const io = getIO();

  //     // Find the match
  //     const match = await MessageModel.findById(matchId);

  //     if (!match) {
  //       return res.status(404).json({ message: "Match not found" });
  //     }

  //     // Check if this user is part of this match
  //     if (![match.requester.toString(), match.receiver.toString()].includes(userId)) {
  //       return res.status(403).json({ message: "Not authorized for this match" });
  //     }

  //     // Check if already completed
  //     if (match.status === 'completed') {
  //       return res.status(200).json({
  //         message: "Skill exchange already completed",
  //         data: match
  //       });
  //     }

  //     // First user confirms
  //     if (!match.completedAt) {
  //       match.completedAt = new Date();
  //       await match.save();

  //       // Notify the other user
  //       io.to(matchId).emit('skillExchangeCompletionRequest', {
  //         matchId,
  //         initiatorId: userId
  //       });

  //       return res.status(200).json({
  //         message: "Waiting for the other user to confirm",
  //         data: match
  //       });
  //     }

  //     // Second user confirms - mark as completed
  //     match.status = 'completed';
  //     await match.save();

  //     // Determine which skill each user learned
  //     const requesterLearnedSkill = match.receiverSkillOffered;
  //     const receiverLearnedSkill = match.requesterSkillOffered;

  //     try {
  //       // Find subcategory details for requester's learned skill
  //       const requesterSubcategory = await SubCategoryModel.findOne({ name: requesterLearnedSkill });

  //       // Find subcategory details for receiver's learned skill
  //       const receiverSubcategory = await SubCategoryModel.findOne({ name: receiverLearnedSkill });

  //       // Add the learned skill to the requester's profile with category/subcategory info
  //       await SkillModel.create({
  //         userId: match.requester,
  //         name: requesterLearnedSkill,
  //         categoryId: requesterSubcategory?.categoryId || null,
  //         subcategoryId: requesterSubcategory?._id || null
  //       });

  //       // Add the learned skill to the receiver's profile with category/subcategory info
  //       await SkillModel.create({
  //         userId: match.receiver,
  //         name: receiverLearnedSkill,
  //         categoryId: receiverSubcategory?.categoryId || null,
  //         subcategoryId: receiverSubcategory?._id || null
  //       });
  //     } catch (skillError) {
  //       console.error("Error adding learned skills:", skillError);
  //       // Don't fail the whole operation if skill addition fails
  //     }

  //     // Notify both users
  //     io.to(matchId).emit('skillExchangeConfirmed', {
  //       matchId,
  //       confirmedBy: userId
  //     });

  //     return res.status(200).json({
  //       message: "Skill exchange marked as completed and skills added to profiles",
  //       data: match
  //     });

  //   } catch (error) {
  //     console.error("Error marking skill exchange as complete:", error);
  //     res.status(500).json({
  //       message: "Failed to mark skill exchange as complete",
  //       error: error.message
  //     });
  //   }
  // },

  // markSkillExchangeCompleted: async (req, res) => {
  //   try {
  //     const { matchId, userId } = req.body;
  //     const io = getIO();
  //     io.emit('newMessage', savedMessage);
  //     emitToUser(receiverId, 'newMessage', savedMessage);

  //     // Find the match
  //     const match = await MessageModel.findById(matchId);

  //     if (!match) {
  //       return res.status(404).json({ message: "Match not found" });
  //     }

  //     // Check if this user is part of this match
  //     if (![match.requester.toString(), match.receiver.toString()].includes(userId)) {
  //       return res.status(403).json({ message: "Not authorized for this match" });
  //     }

  //     // Check if already completed
  //     if (match.status === 'completed') {
  //       return res.status(200).json({
  //         message: "Skill exchange already completed",
  //         data: match
  //       });
  //     }

  //     // First user confirms
  //     if (!match.completedAt) {
  //       match.completedAt = new Date();
  //       await match.save();

  //       // Notify the other user
  //       io.to(matchId).emit('skillExchangeCompletionRequest', {
  //         matchId,
  //         initiatorId: userId
  //       });

  //       return res.status(200).json({
  //         message: "Waiting for the other user to confirm",
  //         data: match
  //       });
  //     }

  //     // Second user confirms - mark as completed
  //     match.status = 'completed';
  //     await match.save();

  //     // Determine which skill each user learned
  //     const requesterLearnedSkill = match.receiverSkillOffered;
  //     const receiverLearnedSkill = match.requesterSkillOffered;

  //     try {
  //       // Find subcategory details for requester's learned skill
  //       const requesterSubcategory = await SubCategoryModel.findOne({ name: requesterLearnedSkill });

  //       // Find subcategory details for receiver's learned skill
  //       const receiverSubcategory = await SubCategoryModel.findOne({ name: receiverLearnedSkill });

  //       // Add the learned skill to the requester's profile with category/subcategory info
  //       await SkillModel.create({
  //         userId: match.requester,
  //         name: requesterLearnedSkill,
  //         categoryId: requesterSubcategory?.categoryId || null,
  //         subcategoryId: requesterSubcategory?._id || null
  //       });

  //       // Add the learned skill to the receiver's profile with category/subcategory info
  //       await SkillModel.create({
  //         userId: match.receiver,
  //         name: receiverLearnedSkill,
  //         categoryId: receiverSubcategory?.categoryId || null,
  //         subcategoryId: receiverSubcategory?._id || null
  //       });
  //     } catch (skillError) {
  //       console.error("Error adding learned skills:", skillError);
  //       // Don't fail the whole operation if skill addition fails
  //     }

  //     // Notify both users
  //     io.to(matchId).emit('skillExchangeConfirmed', {
  //       matchId,
  //       confirmedBy: userId
  //     });

  //     return res.status(200).json({
  //       message: "Skill exchange marked as completed and skills added to profiles",
  //       data: match
  //     });

  //   } catch (error) {
  //     console.error("Error marking skill exchange as complete:", error);
  //     res.status(500).json({
  //       message: "Failed to mark skill exchange as complete",
  //       error: error.message
  //     });
  //   }
  // },

  markSkillExchangeCompleted: async (req, res) => {
    try {
      const { matchId, userId } = req.body;
      const io = getIO();

      // Find the match
      const match = await MessageModel.findById(matchId);

      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      // Check if this user is part of this match
      if (![match.requester.toString(), match.receiver.toString()].includes(userId)) {
        return res.status(403).json({ message: "Not authorized for this match" });
      }

      // Check if already completed
      if (match.status === 'completed') {
        return res.status(200).json({
          message: "Skill exchange already completed",
          data: match
        });
      }

      // First user confirms
      if (!match.completedAt) {
        match.completedAt = new Date();
        await match.save();

        // Notify the other user
        // const otherUserId = match.requester.toString() === userId 
        //     ? match.receiver 
        //     : match.requester;

        io.to(matchId).emit('skillExchangeCompletionRequest', {
          matchId,
          initiatorId: userId
        });

        return res.status(200).json({
          message: "Waiting for the other user to confirm",
          data: match
        });
      }

      // Second user confirms - mark as completed
      match.status = 'completed';
      await match.save();

      // Send completion notifications
      try {
        // Get user details
        const requester = await UserModel.findById(match.requester);
        const receiver = await UserModel.findById(match.receiver);

        // Send email to requester
        await sendMatchCompletedNotification(
          requester.email,
          requester.userName,
          receiver.userName,
          match.requesterSkillOffered,
          match.receiverSkillOffered
        );

        // Send email to receiver
        await sendMatchCompletedNotification(
          receiver.email,
          receiver.userName,
          requester.userName,
          match.receiverSkillOffered,
          match.requesterSkillOffered
        );
      } catch (emailError) {
        console.error("Error sending completion emails:", emailError);
      }

      // Determine which skill each user learned
      const requesterLearnedSkill = match.receiverSkillOffered;
      const receiverLearnedSkill = match.requesterSkillOffered;

      try {
        // Find subcategory details for requester's learned skill
        const requesterSubcategory = await SubCategoryModel.findOne({ name: requesterLearnedSkill });

        // Find subcategory details for receiver's learned skill
        const receiverSubcategory = await SubCategoryModel.findOne({ name: receiverLearnedSkill });

        // Add the learned skill to the requester's profile
        await SkillModel.create({
          userId: match.requester,
          name: requesterLearnedSkill,
          categoryId: requesterSubcategory?.categoryId || null,
          subcategoryId: requesterSubcategory?._id || null
        });

        // Add the learned skill to the receiver's profile
        await SkillModel.create({
          userId: match.receiver,
          name: receiverLearnedSkill,
          categoryId: receiverSubcategory?.categoryId || null,
          subcategoryId: receiverSubcategory?._id || null
        });
      } catch (skillError) {
        console.error("Error adding learned skills:", skillError);
      }

      // Notify both users
      io.to(matchId).emit('skillExchangeConfirmed', {
        matchId,
        confirmedBy: userId
      });

      return res.status(200).json({
        message: "Skill exchange marked as completed and skills added to profiles",
        data: match
      });

    } catch (error) {
      console.error("Error marking skill exchange as complete:", error);
      res.status(500).json({
        message: "Failed to mark skill exchange as complete",
        error: error.message
      });
    }
  },

  getMatchById: async (req, res) => {
    try {
      const { matchId } = req.params;

      const match = await MessageModel.findById(matchId)
        .populate('requester', 'userName profilePic skills status')
        .populate('receiver', 'userName profilePic skills status');

      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      res.status(200).json({
        message: "Match retrieved successfully",
        data: match
      });
    } catch (error) {
      console.error("Error fetching match:", error);
      res.status(500).json({
        message: "Failed to fetch match",
        error: error.message
      });
    }
  },
  // Add to MessageController.js
  getCompletedExchanges: async (req, res) => {
    try {
      const userId = req.params.userId;

      const completedExchanges = await MessageModel.find({
        $or: [
          { requester: userId },
          { receiver: userId }
        ],
        status: 'completed'
      })
        .populate('requester', 'userName profilePic skills')
        .populate('receiver', 'userName profilePic skills')
        .sort({ completedAt: -1 });

      res.status(200).json({
        message: "Completed exchanges retrieved successfully",
        data: completedExchanges
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};