import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/", getCategories);

export default categoryRouter;
