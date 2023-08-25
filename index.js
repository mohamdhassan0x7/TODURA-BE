import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './DB/connection.js'
import routers from './src/Modules/index.router.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(`${process.env.baseUrl}/auth`, routers.authRouter)
app.use(`${process.env.baseUrl}/user`, routers.userRouter)
app.use(`*` , (req,res)=>res.status(404).json({messege:"invalid routng"}))


connectDB()
app.listen(parseInt(process.env.portNumber) , ()=>console.log("server is running"))