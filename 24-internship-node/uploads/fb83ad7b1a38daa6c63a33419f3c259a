// // // const ChatModel = require("../models/ChatModel");

// // // const sendMessage =  async (req, res) => {

// // // }

// // // const getMessage = async (req, res) => {

// // // }

// // // module.exports={
// // //     sendMessage, getMessage
// // // }

// // // const ChatModel = require("../models/ChatModel");

// // // const sendMessage = async (req, res) => {
// // //     try {
// // //         const { matchId, senderId, content } = req.body;

// // //         // Get receiverId from match details (you might need to fetch match details first)
// // //         // For now assuming receiverId is also sent in the request
// // //         const { receiverId } = req.body;

// // //         const newMessage = new ChatModel({
// // //             matchId,
// // //             sender: senderId,
// // //             receiver: receiverId,
// // //             content
// // //         });

// // //         const savedMessage = await newMessage.save();

// // //         // Populate sender details
// // //         const populatedMessage = await ChatModel.findById(savedMessage._id)
// // //             .populate('sender', 'userName profilePic')
// // //             .populate('receiver', 'userName profilePic');

// // //         res.status(201).json({
// // //             success: true,
// // //             message: "Message sent successfully",
// // //             data: populatedMessage
// // //         });
// // //     } catch (error) {
// // //         console.error("Error sending message:", error);
// // //         res.status(500).json({
// // //             success: false,
// // //             message: "Failed to send message",
// // //             error: error.message
// // //         });
// // //     }
// // // };

// // const ChatModel = require("../models/ChatModel");
// // const { getIO } = require("../socketService");
// // const mongoose = require("mongoose");

// // const sendMessage = async (req, res) => {
// //     try {
// //         const { matchId, senderId, content } = req.body;
// //         const { receiverId } = req.body;

// //         const newMessage = new ChatModel({
// //             matchId,
// //             sender: senderId,
// //             receiver: receiverId,
// //             content
// //         });

// //         const savedMessage = await newMessage.save();

// //         const populatedMessage = await ChatModel.findById(savedMessage._id)
// //             .populate('sender', 'userName profilePic')
// //             .populate('receiver', 'userName profilePic');

// //         // Emit the new message to all clients in the match room
// //         getIO().to(matchId).emit('newMessage', populatedMessage);

// //         getIO().to(`user_${receiverId}`).emit('newMessage', populatedMessage);

// //         res.status(201).json({
// //             success: true,
// //             message: "Message sent successfully",
// //             data: populatedMessage
// //             // const io = getIO();
// //             // getIO().to(`user_${message.sender}`).emit('newMessage', message);
// //             // io.to(`user_${message.receiver}`).emit('newMessage', message);
// //         });
// //     } catch (error) {
// //         console.error("Error sending message:", error);
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to send message",
// //             error: error.message
// //         });
// //     }
// // };

// // // ... keep getMessages the same ...

// // const getMessages = async (req, res) => {
// //     try {
// //         const { matchId } = req.params;

// //         const messages = await ChatModel.find({ matchId })
// //             .populate('sender', 'userName profilePic')
// //             .populate('receiver', 'userName profilePic')
// //             .sort({ createdAt: 1 });

// //         res.status(200).json({
// //             success: true,
// //             message: "Messages fetched successfully",
// //             data: messages
// //         });
// //     } catch (error) {
// //         console.error("Error fetching messages:", error);
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to fetch messages",
// //             error: error.message
// //         });
// //     }
// // };

// // const markSkillExchangeCompleted = async (req, res) => {
// //     try {
// //         const { matchId, userId } = req.body;
// //         const io = getIO();

// //         // Emit an event to notify the other user
// //         // io.to(matchId).emit('skillExchangeCompletionRequest', {
// //         //     matchId,
// //         //     initiatorId: userId
// //         // });

// //         res.status(200).json({
// //             success: true,
// //             message: "Confirmation request sent to the other user"
// //         });
// //     } catch (error) {
// //         console.error("Error requesting skill exchange completion:", error);
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to request skill exchange completion",
// //             error: error.message
// //         });
// //     }
// // };

// // // Add this new function to ChatController.js
// // // const getDistinctMatchesByUser = async (req, res) => {
// // //     try {
// // //         const { userId } = req.params;

// // //         // Get all distinct matchIds where the user is either sender or receiver
// // //         const matchIds = await ChatModel.aggregate([
// // //             {
// // //                 $match: {
// // //                     $or: [
// // //                         { sender: mongoose.Types.ObjectId(userId) },
// // //                         { receiver: mongoose.Types.ObjectId(userId) }
// // //                     ]
// // //                 }
// // //             },
// // //             {
// // //                 $group: {
// // //                     _id: "$matchId"
// // //                 }
// // //             },
// // //             {
// // //                 $project: {
// // //                     _id: 0,
// // //                     matchId: "$_id"
// // //                 }
// // //             }
// // //         ]);

// // //         res.status(200).json({
// // //             success: true,
// // //             message: "Distinct matches fetched successfully",
// // //             data: matchIds.map(item => item.matchId)
// // //         });
// // //     } catch (error) {
// // //         console.error("Error fetching distinct matches:", error);
// // //         res.status(500).json({
// // //             success: false,
// // //             message: "Failed to fetch distinct matches",
// // //             error: error.message
// // //         });
// // //     }
// // // };

// // const getDistinctMatchesByUser = async (req, res) => {
// //     try {
// //         const { userId } = req.params;

// //         // Get all distinct matchIds where the user is either sender or receiver
// //         const matchIds = await ChatModel.aggregate([
// //             {
// //                 $match: {
// //                     $or: [
// //                         { sender: new mongoose.Types.ObjectId(userId) },
// //                         { receiver: new mongoose.Types.ObjectId(userId) }
// //                     ]
// //                 }
// //             },
// //             {
// //                 $group: {
// //                     _id: "$matchId"
// //                 }
// //             },
// //             {
// //                 $project: {
// //                     _id: 0,
// //                     matchId: "$_id"
// //                 }
// //             }
// //         ]);

// //         res.status(200).json({
// //             success: true,
// //             message: "Distinct matches fetched successfully",
// //             data: matchIds.map(item => item.matchId)
// //         });
// //     } catch (error) {
// //         console.error("Error fetching distinct matches:", error);
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to fetch distinct matches",
// //             error: error.message
// //         });
// //     }
// // };

// // module.exports = {
// //     sendMessage,
// //     getMessages,
// //     markSkillExchangeCompleted,
// //     getDistinctMatchesByUser
// // };

// const ChatModel = require("../models/ChatModel");
// const { getIO } = require("../socketService");
// const mongoose = require("mongoose");

// const sendMessage = async (req, res) => {
//     try {
//         const { matchId, senderId, content } = req.body;
//         const { receiverId } = req.body;

//         const newMessage = new ChatModel({
//             matchId,
//             sender: senderId,
//             receiver: receiverId,
//             content
//         });

//         const savedMessage = await newMessage.save();

//         const populatedMessage = await ChatModel.findById(savedMessage._id)
//             .populate('sender', 'userName profilePic')
//             .populate('receiver', 'userName profilePic');

//         // Emit the new message to all clients in the match room
//         getIO().to(matchId).emit('newMessage', populatedMessage);

//         res.status(201).json({
//             success: true,
//             message: "Message sent successfully",
//             data: populatedMessage
//         });
//     } catch (error) {
//         console.error("Error sending message:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to send message",
//             error: error.message
//         });
//     }
// };

// const getMessages = async (req, res) => {
//     try {
//         const { matchId } = req.params;

//         const messages = await ChatModel.find({ matchId })
//             .populate('sender', 'userName profilePic')
//             .populate('receiver', 'userName profilePic')
//             .sort({ createdAt: 1 });

//         res.status(200).json({
//             success: true,
//             message: "Messages fetched successfully",
//             data: messages
//         });
//     } catch (error) {
//         console.error("Error fetching messages:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch messages",
//             error: error.message
//         });
//     }
// };

// // const markSkillExchangeCompleted = async (req, res) => {
// //     try {
// //         const { matchId, userId } = req.body;
// //         const io = getIO();

// //         res.status(200).json({
// //             success: true,
// //             message: "Confirmation request sent to the other user"
// //         });
// //     } catch (error) {
// //         console.error("Error requesting skill exchange completion:", error);
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to request skill exchange completion",
// //             error: error.message
// //         });
// //     }
// // };

// const markSkillExchangeCompleted = async (req, res) => {
//     try {
//       const { matchId, userId } = req.body;
//       const io = getIO();
  
//       // Find the match
//       const match = await MessageModel.findById(matchId);
  
//       if (!match) {
//         return res.status(404).json({ message: "Match not found" });
//       }
  
//       // Check if this user is part of this match
//       if (![match.requester.toString(), match.receiver.toString()].includes(userId)) {
//         return res.status(403).json({ message: "Not authorized for this match" });
//       }
  
//       // Check if already completed
//       if (match.status === 'completed') {
//         return res.status(200).json({
//           message: "Skill exchange already completed",
//           data: match
//         });
//       }
  
//       // First user confirms
//       if (!match.completedAt) {
//         match.completedAt = new Date();
//         await match.save();
  
//         // Notify the other user
//         const otherUserId = match.requester.toString() === userId 
//           ? match.receiver 
//           : match.requester;
  
//         io.to(matchId).emit('skillExchangeCompletionRequest', {
//           matchId,
//           initiatorId: userId
//         });
  
//         return res.status(200).json({
//           message: "Waiting for the other user to confirm",
//           data: match
//         });
//       }
  
//       // Second user confirms - mark as completed
//       match.status = 'completed';
//       await match.save();
  
//       // Determine which skill each user learned
//       const requesterLearnedSkill = match.receiverSkillOffered;
//       const receiverLearnedSkill = match.requesterSkillOffered;
  
//       try {
//         // Find subcategory details for requester's learned skill
//         const requesterSubcategory = await SubCategoryModel.findOne({ name: requesterLearnedSkill });
  
//         // Find subcategory details for receiver's learned skill
//         const receiverSubcategory = await SubCategoryModel.findOne({ name: receiverLearnedSkill });
  
//         // Add the learned skill to the requester's profile
//         await SkillModel.create({
//           userId: match.requester,
//           name: requesterLearnedSkill,
//           categoryId: requesterSubcategory?.categoryId || null,
//           subcategoryId: requesterSubcategory?._id || null
//         });
  
//         // Add the learned skill to the receiver's profile
//         await SkillModel.create({
//           userId: match.receiver,
//           name: receiverLearnedSkill,
//           categoryId: receiverSubcategory?.categoryId || null,
//           subcategoryId: receiverSubcategory?._id || null
//         });
//       } catch (skillError) {
//         console.error("Error adding learned skills:", skillError);
//       }
  
//       // Notify both users
//       io.to(matchId).emit('skillExchangeConfirmed', {
//         matchId,
//         confirmedBy: userId
//       });
  
//       return res.status(200).json({
//         message: "Skill exchange marked as completed and skills added to profiles",
//         data: match
//       });
  
//     } catch (error) {
//       console.error("Error marking skill exchange as complete:", error);
//       res.status(500).json({
//         message: "Failed to mark skill exchange as complete",
//         error: error.message
//       });
//     }
//   };

// const getDistinctMatchesByUser = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const matchIds = await ChatModel.aggregate([
//             {
//                 $match: {
//                     $or: [
//                         { sender: new mongoose.Types.ObjectId(userId) },
//                         { receiver: new mongoose.Types.ObjectId(userId) }
//                     ]
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$matchId"
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     matchId: "$_id"
//                 }
//             }
//         ]);

//         res.status(200).json({
//             success: true,
//             message: "Distinct matches fetched successfully",
//             data: matchIds.map(item => item.matchId)
//         });
//     } catch (error) {
//         console.error("Error fetching distinct matches:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch distinct matches",
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     sendMessage,
//     getMessages,
//     markSkillExchangeCompleted,
//     getDistinctMatchesByUser
// };

const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");
const SkillModel = require("../models/SkillModel");
const SubCategoryModel = require("../models/SubCategoryModel");
const { getIO } = require("../socketService");
const mongoose = require("mongoose");

// const sendMessage = async (req, res) => {
//     try {
//         const { matchId, senderId, content } = req.body;
//         const { receiverId } = req.body;

//         const newMessage = new ChatModel({
//             matchId,
//             sender: senderId,
//             receiver: receiverId,
//             content
//         });

//         const savedMessage = await newMessage.save();

//         const populatedMessage = await ChatModel.findById(savedMessage._id)
//             .populate('sender', 'userName profilePic')
//             .populate('receiver', 'userName profilePic');

//         getIO().to(matchId).emit('newMessage', populatedMessage);

//         res.status(201).json({
//             success: true,
//             message: "Message sent successfully",
//             data: populatedMessage
//         });
//     } catch (error) {
//         console.error("Error sending message:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to send message",
//             error: error.message
//         });
//     }
// };

const sendMessage = async (req, res) => {
    try {
        const { matchId, senderId, content } = req.body;
        const { receiverId } = req.body;

        // Handle file attachments if any
        let attachments = [];
        if (req.files && req.files.length > 0) {
            attachments = req.files.map(file => ({
                url: `/uploads/${file.filename}`, // Adjust based on your file storage path
                fileName: file.originalname,
                fileType: file.mimetype,
                fileSize: file.size
            }));
        }

        const newMessage = new ChatModel({
            matchId,
            sender: senderId,
            receiver: receiverId,
            content,
            attachments
        });

        const savedMessage = await newMessage.save();

        const populatedMessage = await ChatModel.findById(savedMessage._id)
            .populate('sender', 'userName profilePic')
            .populate('receiver', 'userName profilePic');

        getIO().to(matchId).emit('newMessage', populatedMessage);

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: populatedMessage
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error.message
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const { matchId } = req.params;

        const messages = await ChatModel.find({ matchId })
            .populate('sender', 'userName profilePic')
            .populate('receiver', 'userName profilePic')
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: messages
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages",
            error: error.message
        });
    }
};

const markSkillExchangeCompleted = async (req, res) => {
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
};

const getDistinctMatchesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const matchIds = await ChatModel.aggregate([
            {
                $match: {
                    $or: [
                        { sender: new mongoose.Types.ObjectId(userId) },
                        { receiver: new mongoose.Types.ObjectId(userId) }
                    ]
                }
            },
            {
                $group: {
                    _id: "$matchId"
                }
            },
            {
                $project: {
                    _id: 0,
                    matchId: "$_id"
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Distinct matches fetched successfully",
            data: matchIds.map(item => item.matchId)
        });
    } catch (error) {
        console.error("Error fetching distinct matches:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch distinct matches",
            error: error.message
        });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    markSkillExchangeCompleted,
    getDistinctMatchesByUser
};