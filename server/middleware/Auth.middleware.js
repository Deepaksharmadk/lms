import jwt from "jsonwebtoken";

import ApiError from "../utiles/ApiError.js";
import asyncHandler from "../utiles/asyncHandler.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  // extracting token from the cookies
  const { token } = req.cookies;
  console.log(token);

  // If no token send unauthorized message
  if (!token) {
    throw new ApiError(401, "Unauthorized, please login to continue");
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(`hello`, decoded);

  // If no decode send the message unauthorized
  if (!decoded) {
    throw new ApiError(401, "Unauthorized, please login to continue");
  }

  // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
  req.user = decoded;
  console.log(`req user`, req.user);

  // Do not forget to call the next other wise the flow of execution will not be passed further
  next();
});

// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to view this route");
    }

    next();
  });

// Middleware to check if user has an active subscription or not
export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {
  // If user is not admin or does not have an active subscription then error else pass
  if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
    throw new ApiError(403, "Please subscribe to access this route.");
  }

  next();
});
