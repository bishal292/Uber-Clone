import express, { Router } from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  userProfile,
  logOutUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be of length 5"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First Name must be of at least 3 characters long"),
  ],
  registerUser
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be of length 5"),
  ],
  loginUser
);

userRouter.get("/profile", authUser, userProfile);

userRouter.get("/logout", authUser, logOutUser);

export default userRouter;
