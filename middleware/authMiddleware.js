import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Error in requireSignIn middleware",
      error,
    });
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access of IsAdmin",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Error in isAdmin middleware",
      error,
    });
  }
};
