const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'inactive'
    },
    roleId:{
        type: Schema.Types.ObjectId,
        ref:"roles"
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref:"categories"
    },
    subcategoryId:{
        type: Schema.Types.ObjectId,
        ref:"subcategories"
    },
    password:{
        type: String
    },
    email:{
        type: String,
       
    },
    contact:{
        type: Number,
    },
    profilePic:{
        type: String
    },
    averageRating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skill'
    }],
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users',userSchema);