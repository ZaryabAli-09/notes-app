import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useNavigate } from "react-router-dom";

const AddNotePopUp = () => {
  const navigate = useNavigate();
  return (
    <div className="backdrop-brightness-20  p-2 m-2 h-72  rounded ">
      <input
        type="text"
        placeholder="Title"
        className="w-full bg-neutral-800 p-3 rounded mb-2"
      />
      <ReactQuill
        required
        // onChange={(value) => setContent(value)}
        className=" text-white bg-black mb-12 h-32"
        theme="snow"
        placeholder="write something here"
      />
      <button className="w-full bg-yellow-500 p-2 rounded text-black font-bold ">
        Add
      </button>
    </div>
  );
};

export default AddNotePopUp;
