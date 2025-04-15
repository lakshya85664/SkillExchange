// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const chatSchema = new Schema({
    
// })

// module.exports = mongoose.model('chats',chatSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const chatSchema = new Schema({
//     matchId: {
//         type: Schema.Types.ObjectId,
//         ref: 'matches',
//         required: true
//     },
//     sender: {
//         type: Schema.Types.ObjectId,
//         ref: 'users',
//         required: true
//     },
//     receiver: {
//         type: Schema.Types.ObjectId,
//         ref: 'users',
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     read: {
//         type: Boolean,
//         default: false
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

const chatSchema = new Schema({
    matchId: {
        type: Schema.Types.ObjectId,
        ref: 'matches',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: {
        type: String,
        required: false // Make this optional since we might have only a file
    },
    attachments: [{
        url: String,
        fileName: String,
        fileType: String,
        fileSize: Number
    }],
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('chats', chatSchema);