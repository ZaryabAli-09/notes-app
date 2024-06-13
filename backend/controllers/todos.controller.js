import { Todos } from "../models/todos.model.js";
const createTodo = async (req, res) => {
  try {
    const { todo, createdBy } = req.body;
    if (!todo || !createdBy || todo === "" || createdBy === "") {
      return res.status(404).json({
        message: "All fields are required",
      });
    }

    const savedTodo = Todos({
      todo,
      createdBy,
    });
    await savedTodo.save();
    res.status(200).json({
      message: "Todo successfully created",
      TodoData: savedTodo,
    });
  } catch (error) {
    res.status(error.statusCode || 501).json({
      message: error.message || "Internal server error",
    });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      return res.status(404).json({
        message: "error occur while deleting todo try again!!",
      });
    }
    const todo = await Todos.findByIdAndDelete(todoId);

    res.status(200).json({
      message: "todo successfully deleted",
      deletedTodo: todo,
    });
  } catch (error) {
    res.status(error.statusCode || 501).json({
      message: error.message || "Internal server error",
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const { createdBy } = req.params;
    if (!createdBy) {
      return res.status(404).json({
        message: "error occur while fetching todos",
      });
    }
    const todos = await Todos.find({ createdBy });
    const totalTodos = await Todos.findOne({ createdBy }).countDocuments();
    // console.log(totalTodos);
    res.status(200).json({
      totalTodos,
      message: "All todos",
      todosData: todos,
    });
  } catch (error) {
    res.status(error.statusCode || 501).json({
      message: error.message || "Internal server error",
    });
  }
};
export { createTodo, deleteTodo, getTodos };
