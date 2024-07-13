import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  console.log("Received token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = await User.findByPk(decoded.userId);
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
