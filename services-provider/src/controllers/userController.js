import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import crypto from "crypto";
import sendEmail from "../utils/email.js";
import { Op } from "sequelize";
import userSchema from "../middlewares/schemas/userSchema.js";

const userController = {
  registerUser: async (req, res) => {
    const { error } = userSchema.registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const { firstName, lastName, email, password, phoneNumber, address, role } =
      req.body;
    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
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
      res
        .status(200)
        .json({ token, user: { id: user.id, name: user.firstName } });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  },

  loginUser: async (req, res) => {
    const { error } = userSchema.loginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ token, user: { id: user.id, name: user.firstName } });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateUserProfile: async (req, res) => {
    const { error } = userSchema.updateUserProfileSchema.validate(req.body, {
      allowUnknown: true,
      presence: "optional",
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const { firstName, lastName, email, password, phoneNumber, address } =
      req.body;
    try {
      const user = await User.findByPk(req.user.id);
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
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  },
  forgotPassword: async (req, res) => {
    const { error } = userSchema.forgotPasswordSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      console.error("Validation errors:", errors); // Log validation errors
      return res.status(400).json({ errors });
    }

    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = Date.now() + 3600000; // 1 hour from now
      await user.save();

      const resetUrl = `http://localhost:3004/reset-password/${resetToken}`;
      const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password:</p>
        <a href=${resetUrl} clickTracking=off>${resetUrl}</a>
      `;
      await sendEmail(user.email, "Password reset request", message);
      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      console.error("Error sending reset email:", error.message); // Log error
      res.status(500).json({ message: "Server error" });
    }
  },

  changePassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  },
  resetPassword: async (req, res) => {
    const { error } = userSchema.resetPasswordSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const { token } = req.params;
    const { password } = req.body;
    try {
      const user = await User.findOne({
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
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default userController;
