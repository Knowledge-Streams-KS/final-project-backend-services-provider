import express from "express";
import {
  createService,
  getServices,
} from "../controllers/serviceController.js";

const serviceRouter = express.Router();

serviceRouter.post("/create", createService);
serviceRouter.get("/", getServices);

export default serviceRouter;
