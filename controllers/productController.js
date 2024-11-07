import {
  createNewProduct,
  deleteProduct,
  findAllCategory,
  findAllProducts,
  findProductById,
  updateProduct,
} from "../services/productService.js";
import { catchError } from "../utils/catchAsyncError.js";

//Add Product - Controller
export const addProduct = catchError(async (req, res) => {
  const { id, name, price, category, description, imageUrl, reviews, ratings } =
    req.body;
  const userId = req.user.id;
  const newProduct = await createNewProduct(
    userId,
    id,
    name,
    price,
    category,
    description,
    imageUrl,
    reviews,
    ratings
  );
  res.status(newProduct.statusCode).json({
    Status: newProduct.status,
    Product_Details: newProduct.details,
  });
});

//Delete Product - Controller

export const removeProduct = catchError(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const deletionProcess = await deleteProduct(userId, productId);
  res
    .status(deletionProcess.statusCode)
    .json({ Details: deletionProcess.status });
});

//Get All Products - Controller
export const getAllProducts = catchError(async (req, res) => {
  const allProducts = await findAllProducts();
  res.status(allProducts.statusCode).json({ All_Products: allProducts });
});

//Get Product by Id - Controller
export const getProductById = catchError(async (req, res) => {
  const productId = req.params.id;
  const product = await findProductById(productId);
  console.log("Controller : ", product);
  res
    .status(product.statusCode)
    .json({ Status: product.status, Product_Detail: product.details });
});

//Update Product Details - Controller
export const updateProductDetails = catchError(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const updateDetails = req.body;
  const updatedProduct = await updateProduct(userId, productId, updateDetails);
  res.status(updatedProduct.statusCode).json({
    Status: updatedProduct.Status,
    Updated_Details: updatedProduct.details,
  });
});

//Get all Category

export const getAllCategory = async (req, res) => {
  const allCategory = await findAllCategory();
  res.status(allCategory.statusCode).json({ All_Category: allCategory });
};
