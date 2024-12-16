import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const captainSchema = new mongoose.Schema({
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
        minlength:[5,'Email must be of length 5'],
    },
    password:{
        type: String,
        required: true,
        minlength:[5,'Password must be of length 5'],
        select:false, // this will not return password in any query by default
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3,'Color must be of at least 3 characters long']
        },
        plate:{
            type: String,
            required: true,
            minlength: [3,'Plate must be of at least 3 characters long']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1,'Capacity must be at least 1']
        },
        vehicleType:{
            type: String,
            required: true,
            enum:['car','bike','auto']
        }
    },
    location:{
        lat:{
            type: Number,
        },
        lon:{
            type: Number,
        }
    }
});



captainSchema.methods.generateAuthToken = function(){
    const maxAge = 3*24*60*60;//3 days
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:maxAge});
}

captainSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


export const CaptainModel = mongoose.model('captain',captainSchema);