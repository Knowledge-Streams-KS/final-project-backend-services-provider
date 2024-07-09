// src/routes/homeServiceRoutes.js

import express from "express";
import homeServiceController from "../controllers/homeServiceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const homeServiceRouter = express.Router();

homeServiceRouter.get(
  "/",
  authMiddleware,
  homeServiceController.getAllHomeServices
);
homeServiceRouter.get("/:id", homeServiceController.getHomeServiceById);
homeServiceRouter.post(
  "/",
  authMiddleware,
  homeServiceController.createHomeService
);
homeServiceRouter.put(
  "/:id",
  authMiddleware,
  homeServiceController.updateHomeService
);
homeServiceRouter.delete(
  "/:id",
  authMiddleware,
  homeServiceController.deleteHomeService
);

export default homeServiceRouter;
