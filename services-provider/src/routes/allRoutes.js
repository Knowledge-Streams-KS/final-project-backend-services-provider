import express from "express";
import bookingRoutes from "./bookingRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import locationRoutes from "./locationRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import providerRoutes from "./providerRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import userRoutes from "./userRoutes.js";

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
