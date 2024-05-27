import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
} from "../controllers/todos.controller.js";
const router = express.Router();

router.get("/get/:createdBy", getTodos);
router.post("/create", createTodo);
router.delete("/delete/:todoId", deleteTodo);

export default router;
