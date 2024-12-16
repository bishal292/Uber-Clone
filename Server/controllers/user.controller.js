import {BlacklistToken} from "../models/blacklistToken.model.js";
import { userModel } from "../models/user.model.js";
import * as UserService from "../services/user.service.js";
import { validationResult } from "express-validator";

export async function registerUser (req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    const {email,password,fullName} = req.body;
    const checkUser = await userModel.findOne({email});
    if(checkUser){
        return res.status(400).json({message:'User already exists'});
    }
    const {firstName,lastName} = fullName;
    const hashedPassword = await userModel.hashPassword(password);

    const user = await UserService.createUser({email,password:hashedPassword,firstName,lastName});

    const token = user.generateAuthToken();
    res.cookie('token',token);

    res.status(201).json({token,user});
}



export async function loginUser(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,user});
}


export async function userProfile(req,res,next){
    res.status(200).json(req.user);
}

export async function logOutUser(req,res,next){
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({token});
    res.status(200).json({message:'Logged Out Successfully'});    
}