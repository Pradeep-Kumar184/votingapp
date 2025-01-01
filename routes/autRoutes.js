import express from "express";
import {
  forgotPasswordController,
  getProfileController,
  loginController,
  registerController,
} from "../controller/authController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
// create user
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.get("/getProfile/:id", requireSignIn, getProfileController);

export default router;
