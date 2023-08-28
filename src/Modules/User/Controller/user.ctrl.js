import { userModel } from "../../../../DB/Models/user.model.js";
import bcrypt from "bcryptjs";
import { taskModel } from '../../../../DB/Models/task.model.js';


export const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const id = req.user._id;
      const user = await userModel.findById(id);
      const match = await bcrypt.compare(oldPassword, user.password);
      if (match) {
        const hashed = await bcrypt.hash(
          newPassword,
          parseInt(process.env.passHashRounds)
        );
        const updated = await userModel.updateOne(
          { _id: id },
          { password: hashed }
        );
        if (updated.modifiedCount) {
          return res.status(200).json({ messege: "done" });
        } else {
          return res.status(400).json({ messege: "error occured" });
        }
      } else {
        return res.status(401).json({ messege: "old password mismatch" });
      }
    } catch (error) {
      return res.status(400).json({ messege: "error occured", error });
    }
}

function getCurrentTimeInEgypt() {
  // Create a new Date object for the current time in Egypt (UTC+2)
  const timeInEgypt = new Date();
  
  // Set the time zone offset to Egypt Standard Time (EST)
  timeInEgypt.setMinutes(timeInEgypt.getMinutes() + 180);

  return timeInEgypt;
}

//------------------------------------------------------------------------
export const upcomingTasks = async(req,res)=>{
  const id = req.user._id

  const user = await userModel.findById(id)
  if(user){
    const currentDate = getCurrentTimeInEgypt().toISOString().split('T')[0] 
    const tasks = await taskModel.find({userId:id})

    const upcoming = tasks.filter((task)=>task.date.toISOString().split('T')[0] > currentDate)
    return res.status(200).json({messege:"done" , upcoming})
  }else{
    return res.status(404).json({messege:"error , user not find"})
  }
}

export const delayedTasks = async(req,res)=>{
  const id = req.user._id

  const user = await userModel.findById(id)
  if(user){
    const currentDate = getCurrentTimeInEgypt().toISOString().split('T')[0]
    const tasks = await taskModel.find({userId:id})
    const delayed = tasks.filter((task)=>task.date.toISOString().split('T')[0]<currentDate)
    return res.status(200).json({messege:"done" , delayed})
  }else{
    return res.status(404).json({messege:"error , user not find"})
  }
}

export const finishedTasks = async(req,res)=>{
  const id = req.user._id

  const user = await userModel.findById(id)
  if(user){
    const tasks = await taskModel.find({userId:id})
    const finished = tasks.filter((task)=>task.finished==1)
    return res.status(200).json({messege:"done" , finished})
  }else{
    return res.status(404).json({messege:"error , user not find"})
  }
}

export const addTask = async(req,res)=>{

  const id = req.user._id

  const user = await userModel.findById(id)
  if(user){
    const{title , date , note} = req.body

    const newTask = new taskModel({userId:id ,title , date , note})
    const saved = await newTask.save()
  
    if(saved){
      return res.status(201).json({messege:"done ,task created"})
    }else{
      return res.status(400).json({messege:"error"})
    }
  }else{
    return res.status(404).json({messege:"error , user not find"})
  }

}

export const setFinished = async(req,res)=>{
  const{taskId} = req.body

  const task = await taskModel.findById(taskId)
  if(task){
      const id = req.user._id
    
      const finished = await taskModel.updateOne({_id:taskId , userId:id , finished:false} , {finished:true} )
      if(finished.modifiedCount){
        return res.status(201).json({messege:"done"})
      }else{
        return res.status(400).json({messege:"error"})
      }
  }else{
    return res.status(404).json({messege:"task not found"})
  }
}  

export const removeTask = async(req,res)=>{
  const{taskId} = req.body

  const task = await taskModel.findById(taskId)
  if(task){
      const id = req.user._id
    
      const deleted = await taskModel.findOneAndDelete({_id:taskId , userId:id})

      if(deleted){
        return res.status(201).json({messege:"done"})
      }else{
        return res.status(400).json({messege:"error"})
      }
  }else{
    return res.status(404).json({messege:"task not found"})
  }
}  

export const todayTasks = async(req,res)=>{
  const id = req.user._id

  const user = await userModel.findById(id)
  if(user){
    const currentDate = getCurrentTimeInEgypt().toISOString().split('T')[0] 
    console.log(currentDate.toLocaleString().split(',')[0])     
    const tasks = await taskModel.find({userId:id})
    const today = tasks.filter((task)=>  task.date.toISOString().split('T')[0] == currentDate)

    const todayUpcoming = today.filter((task)=>task.finished == 0)
    const todayFinished = today.filter((task)=>task.finished == 1)
    return res.status(200).json({messege:"done" ,today, finished:todayFinished , upcoming:todayUpcoming})
  }else{
    return res.status(404).json({messege:"error , user not find"})
  }
}

export const allTasks = async (req,res)=>{
  const id = req.user._id

  const user = await userModel.findById(id)
  if(user){  
    const tasks = await taskModel.find({userId:id})
    return res.status(200).json({messege:"done" ,tasks})
  }else{
    return res.status(404).json({messege:"error , user not find"})
  }
}