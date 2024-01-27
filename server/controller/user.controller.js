import mongoose from "mongoose";
import asyncHandler from "../utiles/asyncHandler.js";
import ApiError from "../utiles/ApiError.js";
import ApiResponse from "../utiles/ApiResponse.js";
import User from "../models/user.model.js";
import uploadToCloudinary from "../utiles/cloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (fullName && email && password === "") {
    throw new ApiError(400, "All fields are required");
  }
  const userExits = await User.findOne({ email });
  if (userExits) {
    throw new ApiError(409, "User with email already exists");
  }
  console.log(req.file);
  // const avatarLocalPath = req.file.path;
  console.log(`avatar hain ${req.file.path}`);
  if (!req.file.path) {
    throw new ApiError(400, "Avatar file is required");
  }

  // const avataricon = await uploadOnCloudinary(req.file.path);
  const avataricon = await uploadToCloudinary(req.file.path);
  // console.log(`upload `, avataricon);
  if (!avataricon) {
    throw new ApiError(400, "Avatar file is required");
  }
  // Create new user with the given necessary data and save to DB
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: avataricon.url,
    },
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, user, "User registered Successfully"));
});
export { registerUser };
