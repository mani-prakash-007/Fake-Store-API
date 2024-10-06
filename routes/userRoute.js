import express from "express";
import { registerUser } from "../controllers/userController.js";
import { registerSchema } from "../validation/userValidation.js";
import { validateFields } from "../middleware/validateFields.js";
const userRouter = express.Router();

//Routes

//User Register Route
userRouter.post("/register", validateFields(registerSchema), registerUser);

//User SignIn Route
userRouter.post("/login");

//Current user Route
userRouter.post("/current");

export default userRouter;
