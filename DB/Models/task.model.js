
import mongoose from "mongoose";

const taskChema = new mongoose.Schema(
  {
    title:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    note:{type:String},
    date:{type:Date, required:true},
    finished:{type:Boolean , default:false}
  },
  { timestamps: true }
);

export const taskModel = mongoose.model('Task',taskChema)
