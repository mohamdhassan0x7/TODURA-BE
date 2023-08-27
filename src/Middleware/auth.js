import jwt from "jsonwebtoken";
import { userModel } from "../../DB/Models/user.model.js";

export function auth() {
  return async (req, res, next) => {
    // try {
      const { token } = req.headers;
      if (token.startsWith(process.env.bearer)) {
        const realToken = token.split(process.env.bearer)[1];
        const decoded = jwt.verify(realToken, process.env.loginToken);
        if (decoded?.id) {
          const id = decoded.id;
          const user = await userModel.findById(id).select("email userName");
          if (user) {
            req.user = user;
            next();
          } else {
            res.status(404).json({ messege: "user not found" });
          }
        } else {
          res.status(401).json({ messege: "invalid token" });
        }
      } else {
        res.status(401).json({ messege: "invalid token" });
      }
    // } catch (error) {
    //   res.status(400).json({ messege: "error occured in auth",  error });
    // }
  };
}
