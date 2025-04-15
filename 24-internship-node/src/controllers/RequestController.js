const RequestModel = require("../models/RequestModel");
const UserModel = require("../models/UserModel");
const SkillModel = require("../models/SkillModel");
const messageController = require('./MessageController');
const MessageModel = require("../models/MessageModel");
const MailUtils = require("../utils/MailUtils");

// const sendRequest = async (req, res) => {
//     try {
//         const { senderId, receiverId, skillName } = req.body;

//         const sender = await UserModel.findById(senderId);
//         const receiver = await UserModel.findById(receiverId);

//         if (!sender || !receiver) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const newRequest = await RequestModel.create({
//             senderId,
//             senderName: sender.userName,
//             receiverId,
//             receiverName: receiver.userName,
//             skillName,
//             status: "Pending"
//         });

//         res.status(201).json({
//             message: "Request sent successfully",
//             data: newRequest
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error sending request",
//             error: error.message
//         });
//     }
// };

// const sendRequest = async (req, res) => {
//     try {
//         const { senderId, receiverId, skillName } = req.body;

//         const sender = await UserModel.findById(senderId);
//         const receiver = await UserModel.findById(receiverId);

//         if (!sender || !receiver) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const newRequest = await RequestModel.create({
//             senderId,
//             senderName: sender.userName,
//             receiverId,
//             receiverName: receiver.userName,
//             skillName,
//             status: "Pending"
//         });

//         // Get socket.io instance
//         const { getIO } = require("../socketService");
//         const io = getIO();

//         // Emit to the receiver's personal room
//         io.to(`user_${receiverId}`).emit('newRequest', {
//             ...newRequest.toObject(),
//             senderProfilePic: sender.profilePic // Add sender's profile picture
//         });

//         res.status(201).json({
//             message: "Request sent successfully",
//             data: newRequest
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error sending request",
//             error: error.message
//         });
//     }
// };

const sendRequest = async (req, res) => {
    try {
        const { senderId, receiverId, skillName } = req.body;

        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        const newRequest = await RequestModel.create({
            senderId,
            senderName: sender.userName,
            receiverId,
            receiverName: receiver.userName,
            skillName,
            status: "Pending"
        });

        // Get socket.io instance
        const { getIO } = require("../socketService");
        const io = getIO();

        // Emit to the receiver's personal room
        io.to(`user_${receiverId}`).emit('newRequest', {
            ...newRequest.toObject(),
            senderProfilePic: sender.profilePic // Add sender's profile picture
        });

        // Send email notification to the receiver
        const emailSubject = `New Skill Exchange Request from ${sender.userName}`;
        const emailText = `
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Hello ${receiver.userName},</h2>
                    <p>You have received a new skill exchange request from ${sender.userName}.</p>
                    <p><strong>Skill Requested:</strong> ${skillName}</p>
                    <p>Please log in to your account to view and respond to this request.</p>
                    <p>Happy Skill Exchanging!</p>
                    <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
                        <p>The Skill Exchange Team</p>
                    </footer>
                </body>
            </html>
        `;

        // Send email (don't await this to avoid delaying the response)
        MailUtils.sendingMail(receiver.email, emailSubject, emailText)
            .catch(err => console.error("Error sending email notification:", err));

        res.status(201).json({
            message: "Request sent successfully",
            data: newRequest
        });
    } catch (error) {
        res.status(500).json({
            message: "Error sending request",
            error: error.message
        });
    }
};

const getRequestsByReceiver = async (req, res) => {
    try {
        const requests = await RequestModel.find({ receiverId: req.params.userId });

        const requestsWithSkills = await Promise.all(requests.map(async req => {
            const senderSkills = await SkillModel.find({ userId: req.senderId });
            return {
                ...req.toObject(),
                senderSkills: senderSkills.map(skill => skill.name)
            };
        }));

        res.json({
            message: "Requests found",
            data: requestsWithSkills
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching requests",
            error: error.message
        });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { status, rejectionReason } = req.body;
        const updatedRequest = await RequestModel.findByIdAndUpdate(
            req.params.id,
            {
                status,
                ...(rejectionReason && { rejectionReason })
            },
            { new: true }
        );

        // If request was accepted, check for potential matches
        // if (status === 'Accepted') {
        //     await messageController.checkAndCreateMatch({ 
        //         body: { requestId: req.params.id } 
        //     }, {
        //         json: () => {},
        //         status: () => ({ json: () => {} })
        //     });
        // }

        // In updateRequestStatus function
        if (status === 'Accepted') {
            await messageController.checkAndCreateMatch({
                body: { requestId: req.params.id }
            }, {
                json: (data) => console.log("Match check result:", data),
                status: (code) => ({ json: (data) => console.log(`Status ${code}:`, data) })
            });
        }

        res.json({
            message: "Request status updated",
            data: updatedRequest
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating request",
            error: error.message
        });
    }
};

const getSentRequests = async (req, res) => {
    try {
        const requests = await RequestModel.find({ senderId: req.params.userId });
        res.json({
            message: "Sent requests found",
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching sent requests",
            error: error.message
        });
    }
};

const acceptRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const request = await RequestModel.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Update request status to accepted
        request.status = "Accepted";
        await request.save();

        // Find if the receiver has also accepted sender's request
        const reciprocalRequest = await RequestModel.findOne({
            senderId: request.receiverId,
            receiverId: request.senderId,
            status: "Accepted"
        });

        if (reciprocalRequest) {
            // Fetch user details
            const sender = await UserModel.findById(request.senderId);
            const receiver = await UserModel.findById(request.receiverId);

            // Ensure unique skill exchange
            const senderSkill = request.skillName;
            const receiverSkill = reciprocalRequest.skillName;

            const senderHasSkill = await SkillModel.exists({ userId: sender._id, skillName: receiverSkill });
            const receiverHasSkill = await SkillModel.exists({ userId: receiver._id, skillName: senderSkill });

            if (!senderHasSkill && !receiverHasSkill) {
                // Store match in messages database
                await MessageModel.create({
                    requester: sender._id,
                    requesterName: sender.userName,
                    requesterSkillOffered: senderSkill,
                    receiver: receiver._id,
                    receiverName: receiver.userName,
                    receiverSkillOffered: receiverSkill,
                    matchedAt: new Date()
                });
            }
        }

        res.status(200).json({ message: "Request accepted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error processing request", error });
    }
};


module.exports = {
    sendRequest,
    getRequestsByReceiver,
    updateRequestStatus,
    getSentRequests,
    acceptRequest
};