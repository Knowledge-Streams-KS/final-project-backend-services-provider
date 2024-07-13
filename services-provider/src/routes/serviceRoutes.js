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
serviceRouter.get("/name/:name", serviceController.getServicesByName);
serviceRouter.get(
  "/location/:location",
  serviceController.getServicesByLocation
);
serviceRouter.get(
  "/provider/:provider",
  serviceController.getServicesByProvider
);
serviceRouter.get("/", serviceController.getAllServices);

export default serviceRouter;
