import Joi from "joi";

export const addProductToCart = Joi.object({
  productId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).messages({
    "string.pattern.base":
      "Invalid ID format. Please provide a valid 24-character hexadecimal ID.",
  }),
  quantity: Joi.number().integer().min(-5).max(5).required(),
});

export const removeProductFromCart = Joi.object({
  id: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).messages({
    "string.pattern.base":
      "Invalid ID format. Please provide a valid 24-character hexadecimal ID.",
  }),
});
