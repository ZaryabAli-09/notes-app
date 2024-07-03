import express from "express";
import {
  loginUser,
  registerUser,
  deleteUser,
  logoutUser,
  verifyEmail,
} from "../controllers/user.controller.js";
import { uploadFileUsingMulter } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/verify.middleware.js";
const router = express.Router();

router.post("/register", uploadFileUsingMulter.single("avatar"), registerUser);
router.post("/login", loginUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/logout", verifyUser, logoutUser);
router.get("/verify-email/:token", verifyUser, verifyEmail);

export default router;
