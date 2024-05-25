import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const AddNotePopUp = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);
  const noteId = useSelector((state) => state.editNotes);

  const [title, setTitle] = useState("");
  const [notesDescription, setNotesDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();

  const getNote = async () => {
    const res = await fetch(`/api/notes/get-specific-note/${noteId.payload}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      setNotesDescription(data.notesData.notesDescription);
      setTitle(data.notesData.title);
    }
    if (!res.ok) {
      setLoading(false);
      setErr(data.message);
    }
  };
  const updateNotes = async () => {
    try {
      const formData = {
        title,
        notesDescription,
      };

      setLoading(true);
      const res = await fetch(`/api/notes/edit-note/${noteId.payload}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        setErr(data.message);
        setTimeout(() => {
          navigate("/notes-page");
        }, 1000);
      }
      if (!res.ok) {
        setLoading(false);
        setErr(data.message);
      }
    } catch (error) {
      setLoading(false);
      setErr(data.message);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="backdrop-brightness-20  p-2 m-2 h-72  rounded ">
      <button className="mb-5">
        <FaArrowAltCircleLeft
          className="text-2xl text-yellow-500 "
          onClick={() => navigate("/notes-page")}
        />
      </button>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="w-full text-white bg-neutral-800 p-3 rounded mb-2"
      />
      <ReactQuill
        value={notesDescription}
        onChange={(value) => setNotesDescription(value)}
        className=" text-white bg-black mb-12 h-32"
        theme="snow"
        placeholder="write something here"
      />
      <button
        onClick={updateNotes}
        className="w-full bg-yellow-500 p-2 rounded text-black font-bold "
      >
        {loading ? "Loading..." : "Update"}
      </button>
      {err && (
        <div className="w-full bg-yellow-300 p-2 rounded mt-2  font-extrabold  font-mono text-black text-center">
          {err}
        </div>
      )}
    </div>
  );
};

export default AddNotePopUp;
