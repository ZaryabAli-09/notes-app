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
  const [loading2, setLoading2] = useState(false);
  const [err, setErr] = useState();
  const [deletePopUp, setDeletePopUp] = useState(false);

  const getNote = async () => {
    try {
      const res = await fetch(
        `https://notes-keep-app.onrender.com/api/notes/get-specific-note/${noteId.payload}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setNotesDescription(data.notesData.notesDescription);
        setTitle(data.notesData.title);
      }
      if (!res.ok) {
        setLoading(false);
        setErr(data.message);
        return;
      }
    } catch (error) {
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
      const res = await fetch(
        `https://notes-keep-app.onrender.com/api/notes/edit-note/${noteId.payload}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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
        return;
      }
    } catch (error) {
      setLoading(false);
      setErr(data.message);
    }
  };

  const deleteNotes = async () => {
    try {
      setLoading2(true);
      const res = await fetch(
        `https://notes-keep-app.onrender.com/api/notes/delete-note/${noteId.payload}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setErr(data.message);
        setLoading2(false);
        return;
      }
      if (res.ok) {
        setErr(data.message);
        setLoading2(false);
        setDeletePopUp(false);
        setTimeout(() => {
          navigate("/notes-page");
        }, 1000);
        return;
      }
    } catch (error) {
      setErr(error.message);
      setLoading2(false);
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
        className="w-full text-black border-gray-400 border-b outline-none py-3 px-1  placeholder:text-gray-500 font-semibold text-sm focus:border-yellow-400 mb-2"
      />
      <ReactQuill
        value={notesDescription}
        onChange={(value) => setNotesDescription(value)}
        className=" text-black bg-white mb-12 h-32"
        theme="snow"
        placeholder="write something here"
      />
      <button
        onClick={updateNotes}
        className="relative px-6 py-3 w-full font-bold mb-2 mt-1 text-black rounded-lg group"
      >
        <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-yellow-500 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-yellow-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
        <span className="relative"> {loading ? "Loading..." : "Update"}</span>
      </button>{" "}
      <button
        onClick={() => setDeletePopUp(true)}
        className="relative px-6 py-3 w-full font-bold mt-1 text-black rounded-lg group"
      >
        <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-red-500 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-red-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
        <span className="relative"> {loading2 ? "Loading..." : "Delete"}</span>
      </button>
      {deletePopUp && (
        <div className="mx-auto relative w-[80%] text-sm -mt-40 h-40 bg-red-600 bg-opacity-80 rounded-lg p-6">
          <p className="text-white">
            Are you sure you want to delete this notes?
          </p>
          <div className="mt-7   flex items-center justify-center">
            <button
              className="bg-white p-2 w-16 rounded-lg font-semibold hover:bg-green-700 mx-2"
              onClick={deleteNotes}
            >
              Yes
            </button>
            <button
              className="bg-white p-2 w-16 rounded-lg font-semibold hover:bg-red-700 mx-2"
              onClick={() => setDeletePopUp(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      {err && (
        <div className="w-full bg-yellow-300 p-2 rounded mt-2  font-extrabold  font-mono text-black text-center">
          {err}
        </div>
      )}
    </div>
  );
};

export default AddNotePopUp;
