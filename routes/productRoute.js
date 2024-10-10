import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  removeProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import {
  validateFields,
  validateParams,
} from "../middleware/validateFields.js";
import {
  addProductSchema,
  productIdSchema,
} from "../validation/productValidation.js";
import { Authorization } from "../middleware/authMiddleware.js";
const productRoute = express.Router();

//Routes

//Add a product
productRoute.post(
  "/",
  validateFields(addProductSchema),
  Authorization,
  addProduct
);

//Delete a product
productRoute.delete(
  "/:id",
  Authorization,
  validateParams(productIdSchema),
  removeProduct
);

//Update a product
productRoute.put(
  "/:id",
  Authorization,
  validateParams(productIdSchema),
  updateProductDetails
);

//Get all products
productRoute.get("/", getAllProducts);

//Get particular product by id
productRoute.get("/:id", validateParams(productIdSchema), getProductById);

//Default Export
export default productRoute;
