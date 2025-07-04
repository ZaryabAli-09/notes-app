import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import Add from "../components/AddNoteBtn";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import searchAnimation from "../assets/searchanimation.gif";

const TodoPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTodos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/todos/get/${user.payload._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setTodos(data.todosData);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteTodo = async (todoId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/todos/delete/${todoId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />

      <main className="container mx-auto px-4 py-6">
        {/* Todo List */}
        <div className="mb-16">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <img
                src={searchAnimation}
                alt="Loading todos"
                className="w-32 h-32 object-contain"
              />
              <p className="mt-4 text-gray-600">Loading your todos...</p>
            </div>
          ) : todos && todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 font-medium">No todos found</p>
              <button
                onClick={() => navigate("/todo/create")}
                className="mt-4 px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Create Your First Todo
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-w-2xl mx-auto">
              {todos?.map((todo) => (
                <div
                  key={todo._id}
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <FiCheck className="text-green-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">
                        {todo.todo.charAt(0).toUpperCase() + todo.todo.slice(1)}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {new Date(todo.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteTodo(todo._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Delete todo"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-6 right-6 z-10">
          <button
            onClick={() => navigate("/todo/create")}
            aria-label="Add new todo"
          >
            <Add />
          </button>
        </div>
      </main>
    </div>
  );
};

export default TodoPage;
