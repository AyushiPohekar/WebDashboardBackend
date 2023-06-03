import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireSignIn = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).json({ message: "Authorization token is missing" });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const transportAuthMiddleware = async(req, res, next) => {
  const requser=await User.findById(req.user.userId);
    if (requser.role !== 'Transporter') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    // If the user passes all authentication checks, proceed to the next middleware or route handler
    next();
  };

  
export const manufacturerAuthMiddleware = async(req, res, next) => {
  
  const requser=await User.findById(req.user.userId);

  try {
    if(requser.role!=="Manufacturer"){
      return res.status(403).json({error:"you are not allowed to access this route"})
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({message:"error in manfacturerAuthmiddleware."})
  }
  };
 


