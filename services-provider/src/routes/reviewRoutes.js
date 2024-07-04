import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", createReview);
reviewRouter.get("/", getReviews);

export default reviewRouter;