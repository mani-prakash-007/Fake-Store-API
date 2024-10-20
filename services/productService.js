import { NotFoundError, UnauthorizedError } from "../custom/customError.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

//Create New Product - Service
export const createNewProduct = async (
  userId,
  id,
  name,
  price,
  category,
  description,
  imageUrl,
  reviews,
  ratings
) => {
  const user = await User.findById(userId);
  if (user.isAdmin === false) {
    throw new UnauthorizedError("Admins only can Add products");
  }
  const product = await Product.create({
    product_id: id,
    product_name: name,
    product_price: price,
    product_category: category,
    product_description: description,
    product_image_url: imageUrl,
    product_rating: ratings,
    product_review: reviews,
  });
  return { statusCode: 200, status: "Product Added", details: product };
};

//Remove Product - Service
export const deleteProduct = async (userId, id) => {
  const user = await User.findById(userId);
  const product = await Product.findById(id);
  if (user.isAdmin === false) {
    throw new UnauthorizedError("Admins only can Add products");
  }
  if (!product) {
    throw new NotFoundError("Product not Found");
  }
  await Product.findByIdAndDelete(id);
  return { statusCode: 200, status: "Product Removed" };
};

//Get All Products - Service
export const findAllProducts = async () => {
  const allProducts = await Product.find();
  if (!allProducts) {
    return {
      statusCode: 200,
      status: "Fetch Success",
      details: "Not products available now. Add product",
    };
  }
  return {
    statusCode: 200,
    status: "Fetch Success",
    details: allProducts,
  };
};

//Get Product by Id - Service
export const findProductById = async (id) => {
  const product = await Product.findById(id);
  console.log("Service : ", product);
  if (!product) {
    throw new NotFoundError("Product Not Found.");
  }
  return { statusCode: 200, status: "Product found", details: product };
};

//Update Product Details - Service
export const updateProduct = async (userId, id, updateDetails) => {
  const user = await User.findById(userId);
  const product = await Product.findById(id);
  if (user.isAdmin == false) {
    throw new UnauthorizedError("Admin only can update products.");
  }
  if (!product) {
    throw new NotFoundError("Product not Found");
  }
  if (Object.keys(updateDetails).length === 0) {
    throw new NotFoundError("Enter Update Details");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: updateDetails }, // Use $set to update only the provided fields
    { new: true, runValidators: true } // Return the updated document and validate fields
  );
  return {
    statusCode: 200,
    Status: "Product Updated Successfully",
    details: updatedProduct,
  };
};
