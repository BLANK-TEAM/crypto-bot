const mongoose = require("mongoose")
const Schema = mongoose.Scheme

const User = new Schema({
    Username:{
        type:String,
        require:true
    },
    Balance:{
        type:Number,
        default:0
    },
    Refs:{
        type:Number,
        default:0
    },
    Subscription:{
        type:String
    },
    UserID:{
        type:String
    }
})

const Usermodel = mongoose.model(`@user`,User)
module.exports = Usermodel