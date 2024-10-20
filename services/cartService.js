import { NotFoundError, UnauthorizedError } from "../custom/customError";
import productSchema from "../models/productSchema.js";
import User from "../models/userSchema.js";

export const addProductToCart = async (userId, productId) => {
  const user = await User.findById(userId);
  const product = await productSchema.findById(productId);
  if (!product) {
    throw new NotFoundError("Product Not Found. Enter a Valid Product ID");
  }
  if (!user) {
    throw new UnauthorizedError("Please Login to add product to cart.");
  }
  
};
