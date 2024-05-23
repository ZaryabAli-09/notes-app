import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddNotePopUp = () => {
  const noteId = useSelector((state) => state.editNotes);
  const user = useSelector((state) => state.user.payload);

  const [note, setNote] = useState({});
  const getNote = async () => {
    const res = await fetch(`/api/notes/get-specific-note/${noteId.payload}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      setNote(data.notesData);
    }
    if (!res.ok) {
      console.log(data);
    }
  };
  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="backdrop-brightness-20  p-2 m-2 h-72  rounded ">
      <input
        value={note.title}
        // onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="w-full text-white bg-neutral-800 p-3 rounded mb-2"
        required
      />
      <ReactQuill
        required
        value={note.notesDescription}
        // onChange={(value) => setNotesDescription(value)}
        className=" text-white bg-black mb-12 h-32"
        theme="snow"
        placeholder="write something here"
      />
      <button
        // onClick={onAddNotes}
        className="w-full bg-yellow-500 p-2 rounded text-black font-bold "
      >
        Add
      </button>
    </div>
  );
};

export default AddNotePopUp;
