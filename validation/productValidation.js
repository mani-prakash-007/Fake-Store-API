import Joi from "joi";

//Product Field Validation
export const addProductSchema = Joi.object({
  id: Joi.number().integer().min(1).required(), // ID must be a positive integer
  name: Joi.string().min(3).max(100).required(), // Name must be a string between 3 and 100 characters
  price: Joi.number().precision(2).positive().required(), // Price must be a positive number with up to 2 decimal places
  category: Joi.string()
    .valid("Electronics", "Home", "Sports", "Accessories", "Furniture")
    .required(), // Category must match one of the allowed values
  description: Joi.string().min(10).max(500).required(), // Description must be a string between 10 and 500 characters
  imageUrl: Joi.string().uri().required(), // Image URL must be a valid URI
  ratings: Joi.number().required(),
  reviews: Joi.number().required(),
});

//Product Id - Validation
export const productIdSchema = Joi.object({
  id: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).messages({
    "string.pattern.base":
      "Invalid ID format. Please provide a valid 24-character hexadecimal ID.",
  }),
});
