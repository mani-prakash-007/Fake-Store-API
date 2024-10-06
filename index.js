//Import
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

//Database Connection
const URI = process.env.MONGODB_CONN_URI;
mongoose.connect(URI);
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("DB Connected");
});

//Routes
//Sub route Imports

//Main Route
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Social Media Application</h1>`);
});

//Sub Routes...
// app.use("/fakestore" , )



app.listen(3000, () => {
  console.log(`Server Running on Port : 3000`);
});
