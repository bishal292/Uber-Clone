import mongoose from "mongoose";


export function connectDB() {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Connected to the database");
    }).catch((err) => {
        console.log("Error connecting to the database: ", err);
    });
} 