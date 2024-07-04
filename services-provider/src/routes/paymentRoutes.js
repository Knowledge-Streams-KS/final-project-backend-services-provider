import express from "express";
import {
  createPayment,
  getPayments,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", createPayment);
paymentRouter.get("/", getPayments);
