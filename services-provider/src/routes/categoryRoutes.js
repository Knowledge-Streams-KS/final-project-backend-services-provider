import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  createCategory
);
categoryRouter.get("/", getCategories);

categoryRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateCategory
);
categoryRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCategory
);

export default categoryRouter;
