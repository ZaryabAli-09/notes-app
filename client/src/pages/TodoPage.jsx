import React, { useEffect, useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import Add from "../components/AddNoteBtn";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import searchAnimation from "../assets/searchanimation.gif";

const TodoPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [todos, setTodos] = useState(null);

  const getTodos = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/todos/get/${user.payload._id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return alert(data.message);
      }
      if (res.ok) {
        setTodos(data.todosData);
      }
    } catch (error) {
      return alert(error.message);
    }
  };
  const onDeleteTodo = async (todoId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/todos/delete/${todoId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return alert(data.message);
      }
      if (res.ok) {
        setTodos(todos.filter((todo) => todo._id !== todoId));
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <Nav />
      <div className="text-white">
        <div className="notes p-4 flex flex-col  space-y-3">
          {todos && todos.length <= 0 ? (
            <div className="text-black">No notes</div>
          ) : todos && todos.length > 0 ? (
            todos.map((todo) => {
              return (
                <div
                  key={todo._id}
                  className="note-1 bg-yellow-500 rounded-lg p-4 flex items-center justify-between w-full"
                >
                  <div className="flex items-center space-x-2">
                    <GrCompliance className="text-green-600" />
                    <h3 className="font-bold text-sm text-black">
                      {todo.todo.charAt(0).toUpperCase() + todo.todo.slice(1)}
                    </h3>
                  </div>
                  <div className="absolute right-20 text-xs text-neutral-700 font-semibold">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </div>
                  <MdAutoDelete
                    className="text-black cursor-pointer hover:text-red-600"
                    onClick={() => onDeleteTodo(todo._id)}
                  />
                </div>
              );
            })
          ) : (
            <div className="w-full flex flex-col items-center justify-center ">
              <img src={searchAnimation} alt="" className="w-[150px]  " />
            </div>
          )}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => navigate("/todo/create")}
        >
          <Add />
        </div>
      </div>
    </>
  );
};

export default TodoPage;
