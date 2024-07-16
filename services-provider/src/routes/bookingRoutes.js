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
bookingRouter.get(
  "/user-bookings",
  authMiddleware,
  bookingController.getUserBookings
); // Add this line
bookingRouter.get("/:id", authMiddleware, bookingController.getBookingById);
bookingRouter.get("/", authMiddleware, bookingController.getAllBookings);

export default bookingRouter;
