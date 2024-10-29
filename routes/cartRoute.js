import express from "express";
import { Authorization } from "../middleware/authMiddleware.js";
import {
  addProduct,
  getAllProducts,
  removeProduct,
} from "../controllers/cartController.js";
import {
  validateFields,
  validateParams,
} from "../middleware/validateFields.js";
import {
  addProductToCart,
  removeProductFromCart,
} from "../validation/cartValidation.js";

const cartRoute = express.Router();

//Routes

//Add Product to cart
cartRoute.post(
  "/",
  Authorization,
  validateFields(addProductToCart),
  addProduct
);

//Remove Product from cart
cartRoute.delete(
  "/:id",
  Authorization,
  validateParams(removeProductFromCart),
  removeProduct
);

cartRoute.get("/", Authorization, getAllProducts);
//Default Export
export default cartRoute;
