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
    app.listen(4000, ()=>{
        console.log(`App is listening at 3000`)
    })
    }).catch((error)=>{
        console.log(error)
    })
#login with email and password
app.get('/login', async(req,res)=>{
    try {
        const {email,password} = req.body
        const result = await Users.findOne({email:email, password:password})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message:"User not found"})
    }
 
})

#user register
app.post('/create_user', async(req, res)=>{
    try {
        const user = req.body
        await Users.create(user)
        res.status(200).json({message:"Successfully created"})
    } catch (error) {
        res.status(400).json(error)
    }
})

#searching legal professionals for users
app.get('/search', async(req, res)=>{
    try {
        const {special} = req.body
        const result = await Users.find({specialization:special})
        return res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message:"None exists"})
    }
})

#to get information about user
app.get('/get_user', async(req,res)=>{
    try {
         const {email} = req.body
         const result = await Users.findOne({email:email})
         res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({message:"Error occured try again"})
    }
})

#dont use this now
app.put('/update_history', async (req, res) => {
    const { email, index, newContent } = req.body;

    try {
        const updatedUser = await Users.findOneAndUpdate(
            { 
                email, 
                "history.index": index  // Search for existing history entry by index
            },
            { 
                $set: { "history.$.content": newContent }  // If found, update content
            },
            { new: true }  // Return updated document
        );

        // If no matching history entry is found, add a new entry
        if (!updatedUser) {
            const user = await Users.findOneAndUpdate(
                { email },  // Find user by email
                { 
                    $push: { history: { index, content: newContent } }  // Add new entry
                },
                { new: true, upsert: true }  // Ensure user is created if not found
            );
            return res.status(200).json({ message: "History added successfully", user });
        }

        res.status(200).json({ message: "Content updated successfully", updatedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});
