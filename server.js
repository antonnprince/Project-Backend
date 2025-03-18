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


app.post('/test', async(req, res)=>{
    try {
        const result = await Users.create({role:"someghn",name:"test",id:3445})
        res.status(200).json(result)
    } catch (error) {
        
        res.status(400).json(error)
    }
})
