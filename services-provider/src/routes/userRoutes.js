import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/profile", authMiddleware, userController.getUserProfile);
userRouter.put("/profile", authMiddleware, userController.updateUserProfile);
userRouter.post("/forgot-password", userController.forgotPassword);
userRouter.put("/reset-password/:token", userController.resetPassword);
userRouter.put(
  "/change-password/",
  authMiddleware,
  userController.changePassword
);

userRouter.get(
  "/provider",
  authMiddleware,
  roleMiddleware("provider"),
  (req, res) => {
    res.send("provider content");
  }
);

export default userRouter;
