import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BlacklistToken } from "../models/blacklistToken.model.js";

export async function authUser(req,res,next) {
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    console.log('Token:', token);
    const isBlacklisted = await BlacklistToken.findOne({ token });
    console.log('isBlacklisted:', isBlacklisted);
    
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id );
        req.user = user;
        
        return next();
    } catch (error) {
        return res.status(401).json({message:'Unauthorized'});
    }
}