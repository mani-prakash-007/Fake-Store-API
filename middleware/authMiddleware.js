import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import { NotFoundError, UnauthorizedError } from "../custom/customError.js";

export const Authorization = async (req, res, next) => {
  let token;
  try {
    // Step 1: Extract token from the header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Step 2: Check if token is not found
    if (!token) {
      throw new NotFoundError("Token not Found in Header");
    }

    // Step 3: Verify the token
    const decoded = jwt.verify(token, process.env.LOGIN_SECRET_KEY);
    // Step 4: Fetch user details from database
    const userDetails = await userSchema.findById(decoded.id);
    if (!userDetails) {
      throw new UnauthorizedError("JsonWebTokenError: invalid signature");
    }

    // Step 5: Attach user details to the request object
    req.user = {
      id: userDetails.id,
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      email: userDetails.email,
      isAdmin: userDetails.isAdmin,
    };

    console.log("Authorization successful."); // Debug Log
    next(); // Call next only once
  } catch (error) {
    // Handle JWT errors and other exceptions
    if (error instanceof jwt.JsonWebTokenError) {
      console.log("JWT Error detected:", error.message); // Debug Log
      return next(
        new UnauthorizedError("JsonWebTokenError: invalid signature")
      );
    }
    next(error);
  }
};

export const verifyAdmin = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (isAdmin) {
    next();
  } else {
    return next(
      new UnauthorizedError("Access denied. Only admins are allowed.")
    );
  }
};

export const verifyUser = (req, res, next) => {
  const isUser = req.user.isAdmin;
  if (isUser) {
    next();
  } else {
    return next(
      new UnauthorizedError("Access denied. Only users are allowed.")
    );
  }
};
