import express from "express";
import {
  cancelBooking,
  confirmBooking,
  createBooking,
  getBookings,
  rescheduleBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleware, createBooking);
bookingRouter.get("/", authMiddleware, getBookings);
bookingRouter.put(
  "/confirm/:id",
  authMiddleware,
  roleMiddleware("admin"),
  confirmBooking
);
bookingRouter.put("/cancel/:id", authMiddleware, cancelBooking);
bookingRouter.put("/reschedule/:id", authMiddleware, rescheduleBooking);

export default bookingRouter;
