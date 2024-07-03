import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
} from "../controllers/todos.controller.js";
import { verifyUser } from "../middlewares/verify.middleware.js";
const router = express.Router();

router.get("/get/:createdBy", verifyUser, getTodos);
router.post("/create", verifyUser, createTodo);
router.delete("/delete/:todoId", verifyUser, deleteTodo);

export default router;
