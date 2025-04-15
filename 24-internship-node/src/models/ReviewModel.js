// // const mongoose = require("mongoose");
// // const Schema = mongoose.Schema;

// // const reviewSchema = new Schema({
// //     reviewerId:{
// //         type: Schema.Types.ObjectId,
// //         ref:"users"
// //     },
// //     reviewedId:{
// //         type: Schema.Types.ObjectId,
// //         ref:"users"
// //     },
// //     subcategoryId:{
// //         type: Schema.Types.ObjectId,
// //         ref:"subcategories"
// //     },
// //     rating:{
// //         type: Number
// //     },
// //     feedback:{
// //         type: String
// //     },
// // })

// // module.exports = mongoose.model('review',reviewSchema);

// const mongoose = require("mongoose");

// const ReviewSchema = new mongoose.Schema({
//     reviewerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "users",
//         required: true
//     },
//     reviewedId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "users",
//         required: true
//     },
//     subcategoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "subcategories",
//         required: true
//     },
//     rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5
//     },
//     feedback: {
//         type: String,
//         required: false
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model("review", ReviewSchema);

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    reviewedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories",
        required: true
    },
    // userRating: {
    //     type: Number,
    //     required: true,
    //     min: 1,
    //     max: 5
    // },
    // skillRating: {
    //     type: Number,
    //     required: true,
    //     min: 1,
    //     max: 5
    // },
    userRating: { type: Number, required: true },  // Rating of the user's teaching
    skillRating: { type: Number, required: true },
    feedback: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("review", ReviewSchema);