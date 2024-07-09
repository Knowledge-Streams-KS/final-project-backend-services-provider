// src/routes/cleaningServiceRoutes.js

import express from "express";
import cleaningServiceController from "../controllers/cleaningServiceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const cleaningServiceRouter = express.Router();

cleaningServiceRouter.get(
  "/",
  authMiddleware,
  cleaningServiceController.getAllCleaningServices
);
cleaningServiceRouter.get(
  "/:id",
  authMiddleware,
  cleaningServiceController.getCleaningServiceById
);
cleaningServiceRouter.post(
  "/",
  authMiddleware,
  cleaningServiceController.createCleaningService
);
cleaningServiceRouter.put(
  "/:id",
  authMiddleware,
  cleaningServiceController.updateCleaningService
);
cleaningServiceRouter.delete(
  "/:id",
  authMiddleware,
  cleaningServiceController.deleteCleaningService
);

export default cleaningServiceRouter;
