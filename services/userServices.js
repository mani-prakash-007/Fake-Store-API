import {
  EmailAlreadyExistsError,
  PhoneNumberExistError,
} from "../custom/customError.js";
import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";

//Main Service
//Register User Services
export const createNewUser = async (fname, lname, email, password, phone) => {
  if (await checkUserEmailExist(email)) {
    throw new EmailAlreadyExistsError("Email Already Exist");
  } else if (await checkPhoneNumberExist(phone)) {
    throw new PhoneNumberExistError("Phone Number Already Exist");
  }
  //Adding Salt to password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  //Creating New User
  const registeredNewUser = await User.create({
    first_name: fname,
    last_name: lname,
    email: email,
    password: hashedPassword,
    phone_number: phone,
  });
  return registeredNewUser;
};

//Sub Services -
const checkUserEmailExist = async (email) => {
  const userEmailExist = await User.findOne({ email });
  if (userEmailExist) {
    return userEmailExist;
  }
};

const checkPhoneNumberExist = async (phone) => {
  const userPhoneNumberExist = await User.findOne({ phone_number: phone });
  if (userPhoneNumberExist) {
    return userPhoneNumberExist;
  }
};
