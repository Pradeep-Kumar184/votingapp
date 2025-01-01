import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/helper.js";
import jwt from "jsonwebtoken";
// register controller
export const registerController = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      address,
      mobile,
      aadharCardNumber,
      password,
      isVoted,
      favourite_game,
    } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!mobile) {
      return res.send({ message: "mobile no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!age) {
      return res.send({ message: "age is Required" });
    }
    if (!aadharCardNumber) {
      return res.send({ message: "aadharCardNumber is Required" });
    }
    if (!favourite_game) {
      return res.send({ message: "favourite_game is Required" });
    }
    // existingUser
    const existingUser = await userModel.findOne({
      aadharCardNumber: aadharCardNumber,
    });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already register please login",
      });
    }
    // hashPassword
    const hashedPassword = await hashPassword(password);
    // new user
    const user = new userModel({
      name,
      age,
      email,
      address,
      mobile,
      aadharCardNumber,
      password: hashedPassword,
      isVoted,
      favourite_game,
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};
// login controller
export const loginController = async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;
    // validator
    if (!aadharCardNumber) {
      res.send({ message: "please provide aadharCardNumber" });
    }
    if (!password) {
      res.send({ message: "please provide password" });
    }
    // chk user
    const user = await userModel.findOne({ aadharCardNumber });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "you are not register",
      });
    }
    // compare password
    const machPassword = await comparePassword(password, user.password);
    if (!machPassword) {
      return res.status(401).send({
        success: false,
        message: "incorrect password",
      });
    }
    // token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Successfully login",
      user: {
        id: user.id,
        name: user.name,
        age: user.age,
        email: user.email,
        mobile: user.phone,
        aadharCardNumber: user.aadharCardNumber,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login controller",
      error,
    });
  }
};
// forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { aadharCardNumber, newPassword, favourite_game } = req.body;
    // validator
    if (!aadharCardNumber) {
      res.status(400).send({ message: "aadharCardNumber is required" });
    }
    if (!favourite_game) {
      res.status(400).send({ message: "favourite_game is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    // chk user
    const user = await userModel.findOne({ aadharCardNumber, favourite_game });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong aadharCardNumber Or favourite_game",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user.id, { password: hashedPassword });
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};
