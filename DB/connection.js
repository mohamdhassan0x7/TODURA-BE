import mongoose from "mongoose";

export const connectDB = async()=>{
    return await mongoose.connect('mongodb+srv://mohamed:123456789mm@cluster0.drs4qr6.mongodb.net/todoList').then(()=>{
        console.log("database connected")
    })

}