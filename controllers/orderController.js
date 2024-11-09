import {
  getAllOrderService,
  placeOrderService,
} from "../services/orderService.js";
import { catchError } from "../utils/catchAsyncError.js";

export const placeOrderContoller = catchError(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const order = await placeOrderService(userId, productId, quantity);
  res
    .status(order.statusCode)
    .json({ status: order.status, orderDetails: order.orderDetails });
});

export const getAllOrdersController = catchError(async (req, res) => {
  const userId = req.user.id;
  const orders = await getAllOrderService(userId);
  res
    .status(orders.statusCode)
    .json({ status: orders.status, details: orders.details });
});
