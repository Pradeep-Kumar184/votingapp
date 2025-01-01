import express from "express";
import {
  forgotPasswordController,
  getProfileController,
  loginController,
  registerController,
  updateProfileController,
} from "../controller/authController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
// create user
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/forgot-password", forgotPasswordController);
router.put("/update-profile/:id", requireSignIn, updateProfileController);
router.get("/getProfile/:id", requireSignIn, getProfileController);

export default router;
