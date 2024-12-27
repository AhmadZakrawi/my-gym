import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";
import dotenv from "dotenv"

dotenv.config()

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("authorization", authorization)
  if (!authorization || authorization.length === 0)
    return res.status(401).json({ error: "Authorization token required" });

  const token = authorization.split(" ")[1];
  try {
    const {id, exp} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
console.log("expire token:", new Date(exp).toString())

    const user = await Users.findAll({
      where: {id}
    });
    
    if (user[0]) req.userId = user[0].id ;

    next();
  } catch (err) {
    if (err.name = "TokenExpiredError") {
      res.status(401).json({error: "TokenExpiredError", })
    } else {
      res.status(401).json({ error: "Request is not authorized" });
    }
    console.log("req errr",err.name);
    
  }
};
