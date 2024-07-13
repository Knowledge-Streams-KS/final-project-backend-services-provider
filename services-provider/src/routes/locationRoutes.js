import express from "express";
import locationController from "../controllers/locationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const locationRouter = express.Router();

locationRouter.post(
  "/create-location",
  authMiddleware,
  locationController.createLocation
);
locationRouter.get(
  "/get-location",
  authMiddleware,
  locationController.getLocation
);

export default locationRouter;
