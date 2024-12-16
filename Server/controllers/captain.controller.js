import { CaptainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export async function registerCaptain(req,res,nex) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password,fullName,vehicle} = req.body;
    const captain = await CaptainModel.findOne({email});
    if(captain){
        return res.status(400).json({message: "Captain already exists"});
    }

    const newCaptain = await createCaptain({email,password,...fullName,...vehicle});

    const token = await newCaptain.generateAuthToken();
    res.cookie("token",token);
    res.status(201).json({captain: newCaptain,token});
}