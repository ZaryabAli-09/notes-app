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
      const res = await fetch(
        "https://keep-notes-321t.onrender.com/api/notes/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fromData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setErr(data.message);
        return;
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
          placeholder="Enter your title here"
          className="w-full text-black border-gray-400 border-b outline-none py-3 px-1  placeholder:text-gray-500 font-semibold text-sm focus:border-yellow-400 mb-2"
        />
        <ReactQuill
          onChange={(value) => setNotesDescription(value)}
          className=" text-black bg-white mb-12 h-32"
          theme="snow"
          placeholder="write something here"
        />
        <button
          onClick={onAddNotes}
          className="relative px-6 py-3 w-full font-bold mt-1 text-black rounded-lg group"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-yellow-500 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-yellow-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
          <span className="relative">{loading ? "Loading..." : "Add"}</span>
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
