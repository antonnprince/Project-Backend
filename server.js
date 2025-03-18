import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {Users} from "./userSchema.js"
dotenv.config()
const app = express()
app.use(express.json())

const mongoURL = process.env.mongo_url

mongoose.connect(mongoURL).then(()=>{
    console.log("Database connected")
    app.listen(3000, ()=>{
        console.log(`App is listening at 3000`)
    })
    }).catch((error)=>{
        console.log(error)
    })

app.get('/login', async(req,res)=>{
    try {
        const {email,password} = req.body
        const result = await Users.findOne({email:email, password:password})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message:"User not found"})
    }
 
})

app.post('/create_user', async(req, res)=>{
    try {
        const user = req.body
        await Users.create(user)
        res.status(200).json({message:"Successfully created"})
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/search', async(req, res)=>{
    try {
        const {special} = req.body
        const result = await Users.find({specialization:special})
        return res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message:"None exists"})
    }
})

app.get('/chat_history', async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(400).json({message:"Error occured try again"})
    }
})
