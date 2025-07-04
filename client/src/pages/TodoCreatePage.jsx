import React, { useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TodoCreatePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const onAddTodo = async () => {
    if (!todo.trim()) {
      setErr("Todo cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/todos/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            todo,
            createdBy: user._id,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setTimeout(() => navigate("/todo"), 1000);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/todo")}
            className="flex items-center text-yellow-600 hover:text-yellow-700 mr-4"
          >
            <FaArrowAltCircleLeft className="text-2xl" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Create New Todo</h2>
        </div>

        <div className="space-y-4">
          <input
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
              setErr(null);
            }}
            type="text"
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />

          <button
            onClick={onAddTodo}
            disabled={loading}
            className={`w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Todo"}
          </button>

          {err && (
            <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center">
              {err}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCreatePage;
