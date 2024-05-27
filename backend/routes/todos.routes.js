import express from "express";
import { createTodo, deleteTodo } from "../controllers/todos.controller.js";
const router = express.Router();

router.post("/create", createTodo);
router.delete("/delete/:todoId", deleteTodo);

export default router;
