import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todos = mongoose.model("Todos", todoSchema);

export { Todos };
