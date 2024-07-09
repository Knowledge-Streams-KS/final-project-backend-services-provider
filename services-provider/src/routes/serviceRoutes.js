import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const serviceRouter = express.Router();

serviceRouter.get("/", getServices);
serviceRouter.get("/:id", getServiceById);
serviceRouter.post("/", authMiddleware, roleMiddleware("admin"), createService);
serviceRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateService
);
serviceRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteService
);

export default serviceRouter;
