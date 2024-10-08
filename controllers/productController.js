import { createNewProduct } from "../services/productService.js";

export const addProduct = async (req, res) => {
  const serviceCall = await createNewProduct();
  res.json({ Message: serviceCall });
  console.log("Controller Ends");
};
