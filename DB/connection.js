import mongoose from "mongoose";

export const connectDB = async()=>{
    return await mongoose.connect("mongodb+srv://mohamedhassan225530:BVR9oT78iDcxD6Nd@cluster0.ibnwk9x.mongodb.net/").then(()=>{
        console.log("database connected")
    })

}
