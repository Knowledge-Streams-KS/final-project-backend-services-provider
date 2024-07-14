// bookingRoutes.js
import express from "express";
import bookingController from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/create-booking",
  authMiddleware,
  bookingController.createBooking
);
bookingRouter.put(
  "/reschedule-booking/:id",
  authMiddleware,
  bookingController.rescheduleBooking
);
bookingRouter.get("/", authMiddleware, bookingController.getAllBookings);
bookingRouter.get("/:id", authMiddleware, bookingController.getBookingById);

export default bookingRouter;
