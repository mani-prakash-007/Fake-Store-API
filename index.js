//Import
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import cartRoute from "./routes/cartRoute.js";
const app = express();
dotenv.config();

// Allow requests from the frontend (http://localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//Parsing Req.Body as Json and url enocded form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database Connection
const URI = process.env.MONGODB_CONN_URI;
mongoose.connect(URI);
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("DB Connected");
});

//Routes
//Sub route Imports
app.use("/fake-store/user", userRouter);
app.use("/fake-store/product", productRoute);
app.use("/fake-store/cart", cartRoute);

//Global Error Handler
app.use(globalErrorHandler);

//Main Route
app.get("/", (req, res) => {
  res.status(200).json({ server_status: "Server Running..." });
});

app.listen(3000, () => {
  console.log(`Server Running on Port : 3000`);
});
