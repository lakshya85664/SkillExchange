const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    adminName:{
        type: String
    },
    status:{
        type: Boolean
    },
    roleId:{
        type: Schema.Types.ObjectId,
        ref:"roles"
    },
    password:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    profilePic:{
        type: String
    }
})

module.exports = mongoose.model('admin',adminSchema);