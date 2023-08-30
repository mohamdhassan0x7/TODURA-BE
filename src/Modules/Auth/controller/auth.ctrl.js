import { userModel } from "../../../../DB/Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { confirmationMail } from "../../../Services/emailConfirmation.js";
import { nanoid } from "nanoid";

export const signUp = async (req, res) => {
  try {
    let { fName, lName, email, password , cPassword , age, gender } = req.body;
    email = email.toLowerCase()

    const preUser = await userModel.findOne({ email });
    if (!preUser) {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.passHashRounds)
      );
      const newUser = new userModel({
        fName,
        lName,
        email,
        password: hashedPassword,
        age,
        gender,
      });
      const savedUser = await newUser.save();

      if (savedUser) {
        const confirmationToken = jwt.sign(
          { id: savedUser._id },
          process.env.confirmationTokenSignature
        );
        const link = `${req.protocol}://${req.headers.host}${process.env.baseUrl}/auth/confirmEmail/${confirmationToken}`;

        const info = await confirmationMail(
          email,
          "Email Confirmation",
          ` 
                <a href=${link}>click here to confirm Email <a>
        `
        );
        console.log(info)

        return res.status(201).json({
          messege: "done, confirmation link have been sent to your email",
          savedUser,
        });
      } else {
        return res.status(400).json({ messege: "error occured" });
      }
    } else {
      //Conflict
      return res.status(409).json({ messege: "email already exists" });
    }
  } catch (error) {
    return res.status(400).json({ messege: "error occured", error });
  }
};

export const finishConfirmation = async (req, res) => {
  try {
    const { token } = req.params;
    if (token) {
      const data = jwt.verify(token, process.env.confirmationTokenSignature);
      if (data.id) {
        const confirmed = await userModel.updateOne(
          { _id: data.id, confirmEmail: false },
          { confirmEmail: true }
        );
        if (confirmed.modifiedCount) {
          return res.status(200).json({ messege: "done" });
          //return res.redirect(process.env.frontendBaseURL)
          //redirectiooooooooooooooooooooooooooooooon
        } else {
          return res.status(404).json({ messege: "no such user" });
        }
      } else {
        return res.status(400).json({ messege: "invalid token" });
      }
    } else {
      return res.status(400).json({ messege: "error occured" });
    }
  } catch (error) {
    return res.status(400).json({ messege: "error occured", error });
  }
};

export const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase()
    const user = await userModel.findOne({ email });
    if (user) {
      if (user.confirmEmail) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign({ id: user._id }, process.env.loginToken);
          return res.status(200).json({ messege: "done", token });
        } else {
          return res.status(401).json({ messege: "wrong password" });
        }
      } else {
        return res.status(403).json({ messege: "please confirm your email first" });
      }
    } else {
      return res.status(404).json({ messege: "this email is not registered" });
    }
  } catch (error) {
    return res.status(400).json({ messege: "error occured", error });
  }
};

export const forgetPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const passCode = nanoid();
      const addCode = await userModel.updateOne({ _id: user.id }, { passCode });
      if (addCode.modifiedCount) {
        confirmationMail(
          email,
          "Reset Password code",
          ` 
                  <h1>Reset password code</h1>
                  <h3>${passCode}</h3>
            `
        );
        res
          .status(200)
          .json({ messege: "done, please check your email for reset code" });
      } else {
        return res.status(400).json({ messege: "error occured" });
      }
    } else {
      return res.status(404).json({ messegd: "user not found" });
    }
  } catch (error) {
    return res.status(400).json({ messegd: "error occured", error });
  }
};

export const changeAfterReset = async (req, res) => {
  try {
    const { passCode, email, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      if (user.passCode == passCode && passCode != null) {
        const hashed = await bcrypt.hash(
          newPassword,
          parseInt(process.env.passHashRounds)
        );
        const update = await userModel.updateOne(
          { _id: user.id },
          { password: hashed, passCode: null }
        );
       return  update.modifiedCount
          ?  res.status(200).json({ messege: "done" })
          :  res.status(400).json({ messege: "error occured" });
      } else {
        return res.status(401).json({ messege: "invalid code" });
      }
    } else {
      return res.status(404).json({ messegd: "user not found" });
    }
  } catch (error) {
    return res.status(400).json({ messegd: "error occured", error });
  }
};
