import Joi from "joi";

export const placeOrderValidation = Joi.object({
  productId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")).messages({
    "string.pattern.base":
      "Invalid ID format. Please provide a valid 24-character hexadecimal ID.",
  }),
  quantity: Joi.number().integer().min(1).max(5).required(),
});
