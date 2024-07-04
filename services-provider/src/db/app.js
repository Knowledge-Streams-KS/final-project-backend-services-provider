import express from "express";
import bodyParser from "body-parser";
import "dotenv/config.js";
import { connectDB } from "./db/config.js";
import syncDb from "./db/init.js";

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(cors());

connectDB();
syncDb();

app.listen(3004, () => {
  console.log("server started");
});
