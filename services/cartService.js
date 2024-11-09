import {
  NotFoundError,
  QuantityLimitExceededError,
} from "../custom/customError.js";
import Product from "../models/productSchema.js";
import Cart from "../models/cartSchema.js";

export const addProductToCart = async (userId, productId, quantity) => {
  console.log(typeof quantity);
  const product = await Product.findById(productId);
  if (!product) {
    throw new NotFoundError("Product Not Found. Enter a Valid Product ID");
  }
  if (quantity > 5) {
    throw new QuantityLimitExceededError(
      "Quantity is more than 5. Max quantity allowed is 5"
    );
  }
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      products: [
        {
          productId: productId,
          quantity: quantity,
        },
      ],
    });
  } else {
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId.toString()
    );
    if (productIndex > -1) {
      const totalQuantity = cart.products[productIndex].quantity + quantity;

      console.log(totalQuantity);
      if (totalQuantity > 5) {
        throw new QuantityLimitExceededError(
          "Quantity is more than 5. Max quantity allowed is 5"
        );
      }
      if (totalQuantity <= 0) {
        throw new QuantityLimitExceededError(
          "Quantity is less than 1. Min quantity allowed is 1"
        );
      } else {
        cart.products[productIndex].quantity += quantity;
      }
    } else {
      cart.products.push({ productId, quantity });
    }
  }
  await cart.save();
  return cart;
};

export const removeProductFromCart = async (userId, productId) => {
  const userCart = await Cart.findOne({ user: userId });
  if (!userCart) {
    throw new NotFoundError("Your Cart is Empty");
  }
  const productIndex = userCart.products.findIndex((p) =>
    p.productId.equals(productId)
  );
  console.log(productIndex);
  if (productIndex < 0) {
    throw new NotFoundError("Product Not found in the Cart");
  }
  userCart.products.splice(productIndex, 1);
  await userCart.save();
  return { statusCode: 200, status: "Product Removed from Cart" };
};

export const getAllProductsFromCart = async (userId) => {
  const userCart = await Cart.findOne({ user: userId });
  if (!userCart) {
    throw new NotFoundError("Your cart is Empty");
  }
  return userCart.products;
};
