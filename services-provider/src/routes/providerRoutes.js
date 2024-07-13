import express from "express";
import providerController from "../controllers/providerController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const providerRouter = express.Router();

providerRouter.post(
  "/create-provider",
  authMiddleware,
  providerController.createProvider
);
providerRouter.get(
  "/get-provider",
  authMiddleware,
  providerController.getProviders
);

export default providerRouter;
