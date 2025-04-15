const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name:{
        type: String
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref:"categories"
    },
    description:{
        type: String
    },
    averageRating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('subcategories',subCategorySchema);