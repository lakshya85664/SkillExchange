const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    subcategoryId: {
        type: Schema.Types.ObjectId,
        ref: "subcategories"
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('skill', skillSchema);