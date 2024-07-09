import express from "express";
import solarServiceController from "../controllers/solarServiceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const solarServiceRouter = express.Router();

solarServiceRouter.get(
  "/",
  authMiddleware,
  solarServiceController.getAllSolarServices
);
solarServiceRouter.get("/:id", solarServiceController.getSolarServiceById);
solarServiceRouter.post(
  "/",
  authMiddleware,
  solarServiceController.createSolarService
);
solarServiceRouter.put(
  "/:id",
  authMiddleware,
  solarServiceController.updateSolarService
);
solarServiceRouter.delete(
  "/:id",
  authMiddleware,
  solarServiceController.deleteSolarService
);

export default solarServiceRouter;
