import express from "express";
import { addProduct } from "../controllers/productController.js";
const productRoute = express.Router();

//Routes

//Add a product
productRoute.post("/", addProduct);

//Delete a product
productRoute.delete("/:id")

//Update a product
productRoute.put("/:id")

//Get all products
productRoute.get("/all-products")

//Get particular product by id
productRoute.get("/:id")

//Default Export
export default productRoute;
