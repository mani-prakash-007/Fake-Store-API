import { NotFoundError } from "../custom/customError.js";
import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";
import userSchema from "../models/userSchema.js";

export const placeOrderService = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  const user = await userSchema.findById(userId);
  if (!user) {
    throw new NotFoundError("User Not Found, Check user Id");
  }
  if (!product) {
    throw new NotFoundError("Product Not Found. Check Product Id");
  }
  const newOrder = await Order.create({
    user: userId,
    productId: productId,
    quantity: quantity,
  });

  return {
    statusCode: 200,
    status: "Order placed successfully",
    orderDetails: newOrder,
  };
};

export const getAllOrderService = async (userId) => {
  const orders = await Order.find({ user: userId });
  return {
    statusCode: 200,
    status: "Fetch Success",
    details: orders,
  };
};
