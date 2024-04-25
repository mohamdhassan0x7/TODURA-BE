import mongoose from "mongoose";

export const connectDB = async()=>{
    return await mongoose.connect(process.env.DATA_BASE).then(()=>{
        console.log("database connected")
    })

}
