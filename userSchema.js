import mongoose from "mongoose"

const historySchema = new mongoose.Schema({
    role:{
        type:String,
        requried:true
    },
    value:{
        type:String,
        required:true
    },

    index:{
        type:Number,
        required:true
    }
})

const userSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    id:{
        type:Number
    },

    history:{
        type:[historySchema],
    }
})

export const Users = mongoose.model('Legal-Lens',userSchema)