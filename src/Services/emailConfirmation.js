import nodemailer from "nodemailer"
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(dirname, "../../.env") })

export const confirmationMail = async (dest, subject, message, attachments = []) => {
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.confirmMail,
          pass: process.env.confirmMailPassword 
        },
        tls: {
          rejectUnauthorized: false
        }
      })
  
      let info = await transporter.sendMail({
        from: 'TODURA',
        to: dest,
        subject,
        html: message,
        attachments
      })
      return info
    } catch (error) {
      console.log(error);
    }
  }