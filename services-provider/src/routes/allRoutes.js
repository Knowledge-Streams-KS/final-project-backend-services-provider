import express from "express";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import providerRoutes from "./providerRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import locationRoutes from "./locationRoutes.js";
import paymentRoutes from "./paymentRoutes.js";

const allRoutes = express.Router();

allRoutes.use("/users", userRoutes);
allRoutes.use("/category", categoryRoutes);
allRoutes.use("/services", serviceRoutes);
allRoutes.use("/bookings", bookingRoutes);
allRoutes.use("/providers", providerRoutes);
allRoutes.use("/reviews", reviewRoutes);
allRoutes.use("/locations", locationRoutes);
allRoutes.use("/payments", paymentRoutes);

export default allRoutes;
