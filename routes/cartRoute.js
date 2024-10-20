import express from "express";
const cartRoute = express.Router();

//Routes

//Add Product to cart
cartRoute.post("/add")

//Remove Product from cart
cartRoute.post("/remove")


//Default Export
export default cartRoute;
