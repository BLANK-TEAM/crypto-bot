import mongoose from "mongoose"

const User = mongoose.Schema({
    Username:{
        type:String,
        require:true
    },
    Balance:{
        type:Number,
        default:0
    },
    RefProc:{
        type:String,
        default:'15%'
    },
    Refs:{
        type:Number,
        default:0
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    next_date_payment: {
        type: Date
    },
    UserID:{
        type:String
    }
})

const Usermodel = mongoose.model(`@user`,User)
export default Usermodel