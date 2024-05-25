import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateNotesPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);

  const [title, setTitle] = useState("");
  const [notesDescription, setNotesDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();
  const onAddNotes = async () => {
    try {
      const fromData = {
        title,
        notesDescription,
        createdBy: user._id,
      };
      setLoading(true);
      const res = await fetch("/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fromData),
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
          navigate("/notes-page");
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
            onClick={() => navigate("/notes-page")}
          />
        </button>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full bg-neutral-800 text-white p-3 rounded mb-2"
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
          {loading ? "Loading..." : "Add"}
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

export default CreateNotesPage;
