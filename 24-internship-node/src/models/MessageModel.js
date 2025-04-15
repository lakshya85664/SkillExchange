// // const mongoose = require("mongoose");
// // const Schema = mongoose.Schema;

// // // const messageSchema = new Schema({
// // //   requester: {
// // //     type: Schema.Types.ObjectId,
// // //     ref: 'users',
// // //     required: true
// // //   },
// // //   receiver: {
// // //     type: Schema.Types.ObjectId,
// // //     ref: 'users',
// // //     required: true
// // //   },
// // //   status: {
// // //     type: String,
// // //     enum: ['pending', 'accepted', 'rejected'],
// // //     default: 'pending'
// // //   },
// // //   matchedAt: {
// // //     type: Date,
// // //     default: Date.now
// // //   },
// // //   skillsExchanged: [{
// // //     type: String
// // //   }]
// // // }, { timestamps: true });

// // // 

// // const messageSchema = new Schema({
// //   requester: {
// //     type: Schema.Types.ObjectId,
// //     ref: 'users',
// //     required: true
// //   },
// //   requesterName: String,
// //   requesterSkills: [String],
// //   requesterSkillOffered: String,  // The specific skill being exchanged
// //   receiver: {
// //     type: Schema.Types.ObjectId,
// //     ref: 'users',
// //     required: true
// //   },
// //   receiverName: String,
// //   receiverSkills: [String],
// //   receiverSkillOffered: String,   // The specific skill being exchanged
// //   status: {
// //     type: String,
// //     enum: ['pending', 'accepted', 'rejected'],
// //     default: 'pending'
// //   },
// //   matchedAt: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   skillsExchanged: [{
// //     type: String
// //   }]
// // }, { timestamps: true });

// // module.exports = mongoose.model('messages', messageSchema);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const messageSchema = new Schema({
//   requester: {
//     type: Schema.Types.ObjectId,
//     ref: 'users',
//     required: true
//   },
//   requesterName: String,
//   requesterSkills: [String],
//   requesterSkillOffered: String,
//   receiver: {
//     type: Schema.Types.ObjectId,
//     ref: 'users',
//     required: true
//   },
//   receiverName: String,
//   receiverSkills: [String],
//   receiverSkillOffered: String,
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected'],
//     default: 'pending'
//   },
//   matchedAt: {
//     type: Date,
//     default: Date.now
//   },
//   skillsExchanged: [String],
//   completionStatus: {
//     initiatedBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'users'
//     },
//     confirmedBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'users'
//     },
//     isCompleted: {
//       type: Boolean,
//       default: false
//     },
//     completedAt: Date
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('messages', messageSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  requesterName: String,
  requesterSkills: [String],
  requesterSkillOffered: String,
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  receiverName: String,
  receiverSkills: [String],
  receiverSkillOffered: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'], // Added 'completed' status
    default: 'pending'
  },
  matchedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date, // Add this field to track completion time
  skillsExchanged: [String]
}, { timestamps: true });

module.exports = mongoose.model('messages', messageSchema);