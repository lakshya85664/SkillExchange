// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const reportSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   subject: {
//     type: String,
//     required: true
//   },
//   customSubject: String,
//   username: String,
//   userId: { 
//     type: Schema.Types.ObjectId,
//     ref: 'users'
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('reports', reportSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  customSubject: String,
  username: String,
  reportedUserId: {  // The user being reported (if applicable)
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  reporterUserId: {  // The user submitting the report
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('reports', reportSchema);