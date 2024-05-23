import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddNotePopUp = () => {
  const user = useSelector((state) => state.user.payload);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [notesDescription, setNotesDescription] = useState("");
  const onAddNotes = async () => {
    try {
      const fromData = {
        title,
        notesDescription,
        createdBy: user._id,
      };
      const res = await fetch("/api/notes/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fromData),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      }
      if (res.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="backdrop-brightness-20  p-2 m-2 h-72  rounded ">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="w-full bg-neutral-800 p-3 rounded mb-2"
        required
      />
      <ReactQuill
        required
        onChange={(value) => setNotesDescription(value)}
        className=" text-white bg-black mb-12 h-32"
        theme="snow"
        placeholder="write something here"
      />
      <button
        onClick={onAddNotes}
        className="w-full bg-yellow-500 p-2 rounded text-black font-bold "
      >
        Add
      </button>
    </div>
  );
};

export default AddNotePopUp;
