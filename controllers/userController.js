import { checkCredentials, createNewUser } from "../services/userServices.js";
import { catchError } from "../utils/catchAsyncError.js";

//Register NewUser Controller
export const registerUser = catchError(async (req, res) => {
  //Request Body Variables
  const { fname, lname, email, password, phone } = req.body;
  //Service Call
  const newUser = await createNewUser(fname, lname, email, password, phone);
  //Response
  res.status(200).json({ Status: "Registration Success", userData: newUser });
});

//Signin
export const loginUser = catchError(async (req, res) => {
  //Request Body Variables
  const { email, password } = req.body;
  //Service Call
  const user = await checkCredentials(email, password);
  //response
  res.status(user.statusCode).json({ Details: user });
});

//Getting Current User  - Controller
export const getCurrentUser = catchError((req, res) => {
  return res.status(200).json({ Current_User: req.user });
});
