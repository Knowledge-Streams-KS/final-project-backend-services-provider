import express from "express";
import personalServiceController from "../controllers/PersonalServiceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const personalServiceRouter = express.Router();

personalServiceRouter.get(
  "/",
  authMiddleware,
  personalServiceController.getAllPersonalServices
);
personalServiceRouter.get(
  "/:id",
  personalServiceController.getPersonalServiceById
);
personalServiceRouter.post(
  "/",
  authMiddleware,
  personalServiceController.createPersonalService
);
personalServiceRouter.put(
  "/:id",
  authMiddleware,
  personalServiceController.updatePersonalService
);
personalServiceRouter.delete(
  "/:id",
  authMiddleware,
  personalServiceController.deletePersonalService
);

export default personalServiceRouter;
