import express from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create-category",
  authMiddleware,
  categoryController.createCategory
);

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.put(
  "/update-category/:id",
  authMiddleware,
  categoryController.updateCategory
);
categoryRouter.delete(
  "/delete-category/:id",
  authMiddleware,
  categoryController.deleteCategory
);

export default categoryRouter;
