import express from "express";
import "dotenv/config.js";
import { connectDB } from "./db/config.js";
import cors from "cors";
import morgan from "morgan";
import syncDb from "./db/init.js";
import logger from "./middlewares/loggerMiddleware.js";
import allRoutes from "./routes/allRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(morgan("dev"));

app.use("api/", allRoutes);

connectDB();
syncDb();

app.listen(3004, () => {
  console.log("server started");
});
