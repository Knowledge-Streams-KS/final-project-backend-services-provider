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

allRoutes.use(bookingRoutes);
allRoutes.use(categoryRoutes);
allRoutes.use(locationRoutes);
allRoutes.use(paymentRoutes);
allRoutes.use(providerRoutes);
allRoutes.use(reviewRoutes);
allRoutes.use(serviceRoutes);
allRoutes.use(userRoutes);

export default allRoutes;
