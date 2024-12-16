import { userModel } from "../models/user.model.js";

export async function createUser({email, password, firstName, lastName}) {
    if(!email || !password || !firstName) {
        throw new Error("All fields are mandatory");
    }
    const user = await userModel.create({email, password, fullName:{
        firstName,
        lastName
    }});

    return user;
}