import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName:{
        firstName: {
            type: String,
            required: true,
            minlength: [3,'First Name must be of at least 3 characters long']
        },
        lastName:{
            type: String,
            minlength: [3,'First Name must be of at least 3 characters long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength:[5,'Email must be of length 5']
    },
    password:{
        type: String,
        required: true,
        minlength:[5,'Password must be of length 5'],
        select:false, // this will not return password in any query by default
    },
    socketId:{
        type: String,
    }
});

userSchema.methods.generateAuthToken = function(){
    const maxAge = 3*24*60*60;
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:maxAge});
}
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const userModel = mongoose.model('User',userSchema);