import express from "express";
import {
  createBooking,
  getBookings,
} from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", authMiddleware, createBooking);
bookingRouter.get("/", authMiddleware, getBookings);

export default bookingRouter;
