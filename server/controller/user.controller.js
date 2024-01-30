import { uploadOnCloudinary } from "../server.js";
import asyncHandler from "../utiles/asyncHandler.js";
import ApiError from "../utiles/ApiError.js";
import ApiResponse from "../utiles/ApiResponse.js";
import User from "../models/user.model.js";

const cookieOptions = {
  secure: process.env.NODE_ENV === "production" ? true : false,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
};
const registerUser = asyncHandler(async (req, res, next) => {
  // Destructuring the necessary data from req object
  const { fullName, email, password } = req.body;

  // Check if the data is there or not, if not throw error message
  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user exists with the provided email
  const userExists = await User.findOne({ email });

  // If user exists send the reponse
  if (userExists) {
    throw new ApiError(409, "Email already exists");
  }

  // Create new user with the given necessary data and save to DB
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });

  // If user not created send message response
  if (!user) {
    throw new ApiError("User registration failed, please try again later", 400);
  }

  // Run only if user sends a file
  console.log(req.file);
  if (req.file) {
    try {
      const result = await uploadOnCloudinary(req.file.path);
      console.log(result);

      // If success
      if (result) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;
        console.log(`what`, result);
      }
    } catch (error) {
      throw new ApiError("file not uploaded", error);
    }
  }

  // Save the user object
  await user.save();

  // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie("token", token, cookieOptions);

  // If all good send the response to the frontend
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});
const loginUser = asyncHandler(async (req, res, next) => {
  // Destructuring the necessary data from req object
  const { email, password } = req.body;
  // Check if the data is there or not, if not throw error message
  if (!email || !password) {
    throw new ApiError("Email and Password are required", 400);
  }

  // Finding the user with the sent email
  const user = await User.findOne({ email }).select("+password");

  // If no user or sent password do not match then send generic response
  if (!(user && (await user.comparePassword(password)))) {
    throw new ApiError(
      401,
      "Email or Password do not match or user does not exist"
    );
  }
  // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie("token", token, cookieOptions);

  // If all good send the response to the frontend
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  });
});
const logoutUser = asyncHandler(async (_req, res, _next) => {
  // Setting the cookie value to null
  res.cookie("token", null, {
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 0,
    httpOnly: true,
  });
  // Sending the response
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});
export { registerUser, loginUser, logoutUser };
