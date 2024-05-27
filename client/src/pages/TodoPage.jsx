import React from "react";
import { MdAutoDelete } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import Add from "../components/AddNoteBtn";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div className="text-white">
        <div className="notes p-4 flex flex-col  space-y-3">
          <div className="note-1 bg-neutral-800 rounded-lg p-4 flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <GrCompliance className="hover:text-green-500" />
              <h3 className="font-bold text-sm ">Personal Details</h3>
            </div>
            <MdAutoDelete className="text-white hover:text-red-500" />
          </div>
          <div className="note-1 bg-neutral-800 rounded-lg p-4 flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <GrCompliance className="hover:text-green-500" />
              <h3 className="font-bold text-sm ">Personal Details</h3>
            </div>
            <MdAutoDelete className="text-white hover:text-red-500" />
          </div>
          <div className="note-1 bg-neutral-800 rounded-lg p-4 flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <GrCompliance className="hover:text-green-500" />
              <h3 className="font-bold text-sm ">Personal Details</h3>
            </div>
            <MdAutoDelete className="text-white hover:text-red-500" />
          </div>
          <div className="note-1 bg-neutral-800 rounded-lg p-4 flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <GrCompliance className="hover:text-green-500" />
              <h3 className="font-bold text-sm ">Personal Details</h3>
            </div>
            <MdAutoDelete className="text-white hover:text-red-500" />
          </div>
          <div className="note-1 bg-neutral-800 rounded-lg p-4 flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <GrCompliance className="hover:text-green-500" />
              <h3 className="font-bold text-sm ">Personal Details</h3>
            </div>
            <MdAutoDelete className="text-white hover:text-red-500" />
          </div>
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
