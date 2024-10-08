//Import
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
const app = express();
dotenv.config();

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

//Global Error Handler
app.use(globalErrorHandler);

//Main Route
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Social Media Application</h1>`);
});

//Sub Routes...
// app.use("/fakestore" , )

app.listen(3000, () => {
  console.log(`Server Running on Port : 3000`);
});
