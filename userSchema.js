import mongoose from "mongoose"

const historySchema = new mongoose.Schema({
    content:{
        type:[Object]
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

    email:{
        type:String,
        requried:true
    },

    password:{
        type:String,
        required:true
    },

    specialization:{
        type:String,
    },

    name:{
        type:String,
        required:true
    },

    id:{
        type:Number
    },

    history:{
        type:[{historySchema}]
    }
})

export const Users = mongoose.model('Legal-Lens',userSchema)