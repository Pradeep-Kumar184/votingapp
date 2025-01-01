import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controller/authController.js";
const router = express.Router();
// create user
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

export default router;
