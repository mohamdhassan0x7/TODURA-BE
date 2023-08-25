import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: { type: String },
    lName: { type: String },
    email: { type: String, unique: true, required: true },
    confirmEmail: { type: Boolean , default:false },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    passCode:{type:String , default:null}
  },
  { timestamps: true }
);

export const userModel = mongoose.model('User',userSchema)
