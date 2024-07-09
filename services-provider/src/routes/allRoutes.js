import express from "express";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import providerRoutes from "./providerRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import locationRoutes from "./locationRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import homeServiceRoutes from "./homeServiceRoutes.js";
import cleaningServiceRoutes from "./cleaningServicesRoutes.js";
import personalServiceRoutes from "./personalServiceRoutes.js";
import solarServiceRoutes from "./solarServiceRoutes.js";
import homeInspectionRoutes from "./homeInspectionRoutes.js";

const allRoutes = express.Router();

allRoutes.use("/users", userRoutes);
allRoutes.use("/categories", categoryRoutes);
allRoutes.use("/services", serviceRoutes);
allRoutes.use("/bookings", bookingRoutes);
allRoutes.use("/providers", providerRoutes);
allRoutes.use("/reviews", reviewRoutes);
allRoutes.use("/locations", locationRoutes);
allRoutes.use("/payments", paymentRoutes);
allRoutes.use("./home-Service", homeServiceRoutes);
allRoutes.use("/cleaning-services", cleaningServiceRoutes);
allRoutes.use("/personal-services", personalServiceRoutes);
allRoutes.use("/solar-services", solarServiceRoutes);
allRoutes.use("/home-inspections", homeInspectionRoutes);

export default allRoutes;
