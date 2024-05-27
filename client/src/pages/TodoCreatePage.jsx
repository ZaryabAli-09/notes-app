import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TodoCreatePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);

  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();

  const onAddTodo = async () => {
    try {
      const formData = {
        todo,
        createdBy: user._id,
      };
      setLoading(true);
      const res = await fetch("/api/todos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setErr(data.message);
      }
      if (res.ok) {
        setLoading(false);
        setErr(data.message);
        setTimeout(() => {
          navigate("/todo");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.message);
    }
  };
  return (
    <>
      <div className="backdrop-brightness-20  p-2 m-2 h-72  rounded ">
        <button className="mb-5">
          <FaArrowAltCircleLeft
            className="text-2xl text-yellow-500 "
            onClick={() => navigate("/todo")}
          />
        </button>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="Enter your todo"
          className="w-full mt-24 bg-neutral-800 text-white p-8 rounded mb-2 outline-yellow-500"
        />

        <button
          onClick={onAddTodo}
          className="w-full bg-yellow-500 p-2 rounded text-black font-bold "
        >
          {loading ? "Loading..." : "Add Todo"}
        </button>
        {err && (
          <div className="w-full bg-yellow-300 p-2 rounded mt-2  font-extrabold  font-mono text-black text-center">
            {err}
          </div>
        )}
      </div>
    </>
  );
};

export default TodoCreatePage;
