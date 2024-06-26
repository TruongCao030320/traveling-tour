import express from "express";
import cors from "cors";
import { connectToDb } from "./src/utils/db_connection/connection";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import tourRouter from "./src/routes/tour.js";
import reviewRouter from "./src/routes/review.js";
import authRouter from "./src/routes/auth.js";
dotenv.config();
const PORT = 8088;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
connectToDb();
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
