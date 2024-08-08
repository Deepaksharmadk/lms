import { Router } from "express";
const router = Router();

import { upload } from "../middleware/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUserDetails,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/Auth.middleware.js";
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(isLoggedIn, getLoggedInUserDetails);
router.route("/reset").post(forgotPassword);
router.route("/reset/:resetToken").post(resetPassword);
router.route("/change-password").post(isLoggedIn, changePassword);
router
  .route("/update/:id")
  .put(isLoggedIn, upload.single("avatar"), updateUser);
export default router;
