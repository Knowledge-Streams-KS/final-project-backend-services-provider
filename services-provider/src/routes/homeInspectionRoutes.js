import express from "express";
import homeInspectionController from "../controllers/homeInspectionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const homeInspectionRouter = express.Router();

homeInspectionRouter.get(
  "/",
  authMiddleware,
  homeInspectionController.getAllHomeInspections
);
homeInspectionRouter.get(
  "/:id",
  homeInspectionController.getHomeInspectionById
);
homeInspectionRouter.post(
  "/",
  authMiddleware,
  homeInspectionController.createHomeInspection
);
homeInspectionRouter.put(
  "/:id",
  authMiddleware,
  homeInspectionController.updateHomeInspection
);
homeInspectionRouter.delete(
  "/:id",
  authMiddleware,
  homeInspectionController.deleteHomeInspection
);

export default homeInspectionRouter;
