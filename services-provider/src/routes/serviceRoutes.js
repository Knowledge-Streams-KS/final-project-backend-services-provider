import express from "express";
import serviceController from "../controllers/serviceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const serviceRouter = express.Router();

serviceRouter.post(
  "/create-service",
  authMiddleware,
  roleMiddleware("provider"),
  serviceController.createService
);
serviceRouter.get(
  "/category/:category",
  serviceController.getServicesByCategory
);

serviceRouter.get("/", serviceController.getAllServices);
serviceRouter.get("/:id", authMiddleware, serviceController.getServiceById);

export default serviceRouter;
