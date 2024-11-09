import express from "express";
import { validateFields } from "../middleware/validateFields.js";
import { placeOrderValidation } from "../validation/orderValidation.js";
import {
  getAllOrdersController,
  placeOrderContoller,
} from "../controllers/orderController.js";
import { Authorization } from "../middleware/authMiddleware.js";
export const orderRoute = express.Router();

//Routes

//Place Order Route
orderRoute.post(
  "/",
  Authorization,
  validateFields(placeOrderValidation),
  placeOrderContoller
);

//Get Placed Orders route
orderRoute.get("/", Authorization, getAllOrdersController);
