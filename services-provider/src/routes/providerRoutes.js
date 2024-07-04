import express from "express";
import {
  createProvider,
  getProviders,
} from "../controllers/providerController.js";

const providerRouter = express.Router();

providerRouter.post("/create", createProvider);
providerRouter.get("/", getProviders);

export default providerRouter;
