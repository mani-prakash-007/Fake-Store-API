// Imports
import { joiPasswordExtendCore } from "joi-password";
import Joi from "joi";
const JoiPassword = Joi.extend(joiPasswordExtendCore);

// Schemas for User
// Register user Schema
export const registerSchema = Joi.object({
  fname: Joi.string().min(3).max(50).required().messages({
    "string.pattern.base":
      "First Name must contain minimum least 3 letters and maximum 50 letters.",
  }),
  lname: Joi.string().min(3).max(50).required().messages({
    "string.pattern.base":
      "Last Name must contain minimum least 3 letters and maximum 50 letters.",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required()
    .messages({
      "string.email":
        "Please enter a valid email address with a domain of .com, .net, or .org.",
      "any.required": "Email is required.",
    }),
  password: JoiPassword.string()
    .min(8)
    .max(30)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
    .messages({
      "password.min": "Password must contain at least 8 character",
      "password.max": "Password must contain at most 30 character",
      "password.minOfUppercase":
        "Password should contain at least one uppercase character",
      "password.minOfSpecialCharacters":
        "Password should contain at least one special character",
      "password.minOfLowercase":
        "Password should contain at least one lowercase character",
      "password.minOfNumeric":
        "Password should contain at least one numeric character",
      "password.noWhiteSpaces": "Password should not contain white spaces",
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/) // Regular expression for exactly 10 digits
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits.",
      "any.required": "Phone number is required.",
    }),
}).with("fname", "lname");

// Login user Schema
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .messages({
      "string.email":
        "Please enter a valid email address with a domain of .com, .net, or .org.",
      "any.required": "Email is required.",
    })
    .required(),
  password: Joi.string().required(),
});
