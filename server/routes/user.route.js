import { Router } from "express";
const router = Router();
import { verifyJWT } from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/user.controller.js";
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
