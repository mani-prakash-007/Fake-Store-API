import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_category: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_image_url: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
// DB Schema Outline

// Product Id : Integer

// Product Name : String

// Product Price : Integer

// Product Category : String

// Product Description : String

// Product Image Url : String
