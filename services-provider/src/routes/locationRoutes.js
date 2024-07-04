import express from "express";
import {
  createLocation,
  getLocation,
} from "../controllers/locationController.js";

const locationRouter = express.Router();

locationRouter.post("/create", createLocation);
locationRouter.get("/", getLocation);

export default locationRouter;
