import express from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controllers/captain.controller.js";

const captainRouter = express.Router();

captainRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be of length 5"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First Name must be of at least 3 characters long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be of at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be of at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be of at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Type must be either car, bike or Auto')
  ],
  registerCaptain
);

export default captainRouter;
