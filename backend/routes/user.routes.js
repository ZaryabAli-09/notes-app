import express from "express";
import {
  loginUser,
  registerUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { uploadFileUsingMulter } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.post("/register", uploadFileUsingMulter.single("avatar"), registerUser);
router.post("/login", loginUser);
router.delete("/delete/:userId", deleteUser);

export default router;
