import {
  addProductToCart,
  getAllProductsFromCart,
  removeProductFromCart,
} from "../services/cartService.js";
import { catchError } from "../utils/catchAsyncError.js";

export const addProduct = catchError(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const product = await addProductToCart(userId, productId, quantity);
  res.status(200).json({ message: "Product Added to cart", Details: product });
});

export const removeProduct = catchError(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const productRemoval = await removeProductFromCart(userId, productId);
  res
    .status(productRemoval.statusCode)
    .json({ Details: productRemoval.status });
});

export const getAllProducts = catchError(async (req, res) => {
  const userId = req.user.id;
  const cartProducts = await getAllProductsFromCart(userId);
  res
    .status(200)
    .json({ message: "Fetch Success", cartProducts: cartProducts });
});
