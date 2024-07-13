import express from "express";
import reviewController from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", reviewController.createReview);
reviewRouter.get("/", reviewController.getReviews);

export default reviewRouter;
