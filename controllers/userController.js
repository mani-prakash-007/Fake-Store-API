import { createNewUser } from "../services/userServices.js";
import { catchError } from "../utils/catchAsyncError.js";

//Register NewUser Controller
export const registerUser = catchError(async (req, res) => {
  //Request Body Variables
  const { fname, lname, email, password, phone } = req.body;
  //Service Call
  const newUser = await createNewUser(fname, lname, email, password, phone);
  //
  res.status(200).json({ Status: "Registration Success", userData: newUser });
});
