import express from "express";
import paymentController from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", paymentController.createPayment);
paymentRouter.get("/", paymentController.getPayments);

export default paymentRouter;
