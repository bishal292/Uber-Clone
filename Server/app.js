import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.Routes.js";
import captainRouter from "./routes/captain.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/user", userRouter);
app.use("/captain", captainRouter);


export default app;