import mongoose from "mongoose";

export const connectDB = async()=>{
    return await mongoose.connect('mongodb+srv://mohamedhassan225530:boqyM0AfH3r9cFnV@cluster0.ibnwk9x.mongodb.net/Todura?retryWrites=true&w=majority').then(()=>{
        console.log("database connected")
    })

}
