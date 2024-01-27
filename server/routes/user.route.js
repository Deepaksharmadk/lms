import { Router } from "express";
const router = Router();
import { upload } from "../middleware/multer.middleware.js";
import { registerUser } from "../controller/user.controller.js";
router.route("/register").post(upload.single("avatar"), registerUser);
export default router;
