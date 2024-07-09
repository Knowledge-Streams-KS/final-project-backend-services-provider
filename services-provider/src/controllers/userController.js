import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import sendEmail from "../utils/email.js";
import { Op } from "sequelize";

// Registration Controller
const registerUser = [
  check("firstName").not().isEmpty().withMessage("First name is required"),
  check("email").isEmail().withMessage("Please include a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("role")
    .isIn(["customer", "provider"])
    .withMessage("Role must be either 'customer' or 'provider'"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password, phoneNumber, address, role } =
      req.body;
    try {
      let user = await userModel.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role,
      });

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
];

// Login Controller
const loginUser = [
  check("email").isEmail().withMessage("Please include a valid email"),
  check("password").exists().withMessage("Password is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Profile Controller
const updateUserProfile = [
  check("firstName")
    .optional()
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please include a valid email"),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password, phoneNumber, address } =
      req.body;
    try {
      const user = await userModel.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (address) user.address = address;
      await user.save();
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

// Forgot Password Controller
const forgotPassword = [
  check("email").isEmail().withMessage("Please include a valid email"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      const user = await userModel.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = Date.now() + 300000; // 5 minutes from now
      await user.save();

      const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
      const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;
      await sendEmail(user.email, "Password reset request", message);
      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

// Reset Password Controller
const resetPassword = [
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { token } = req.params;
    const { password } = req.body;
    try {
      const user = await userModel.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpire: { [Op.gt]: Date.now() },
        },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = null;
      user.resetPasswordExpire = null;
      await user.save();
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

export {
  registerUser,
  loginUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  getUserProfile,
};
