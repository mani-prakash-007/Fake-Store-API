import express from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { loginSchema, registerSchema } from "../validation/userValidation.js";
import { validateFields } from "../middleware/validateFields.js";
import { Authorization } from "../middleware/authMiddleware.js";
const userRouter = express.Router();

//Routes

//User Register Route
userRouter.post("/register", validateFields(registerSchema), registerUser);

//User SignIn Route
userRouter.post("/login", validateFields(loginSchema), loginUser);

//Current user Route
userRouter.get("/current", Authorization, getCurrentUser);

export default userRouter;
