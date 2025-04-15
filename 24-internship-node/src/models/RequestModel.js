const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    skillName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
    rejectionReason: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('request', requestSchema);