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
  const [err, setErr] = useState(null);

  const onAddNotes = async () => {
    if (!title.trim()) {
      setErr("Title is required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            notesDescription,
            createdBy: user._id,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setTimeout(() => navigate("/notes-page"), 1000);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/notes-page")}
            className="flex items-center text-yellow-600 hover:text-yellow-700 mr-4"
          >
            <FaArrowAltCircleLeft className="text-2xl" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Create New Note</h2>
        </div>

        <div className="space-y-6">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErr(null);
            }}
            type="text"
            placeholder="Note Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg font-medium"
          />

          <div className="h-64 mb-4">
            <ReactQuill
              value={notesDescription}
              onChange={setNotesDescription}
              className="h-[200px] mb-4"
              theme="snow"
              placeholder="Write your note here..."
            />
          </div>

          <button
            onClick={onAddNotes}
            disabled={loading}
            className={`w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Note"}
          </button>

          {err && (
            <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center">
              {err}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNotesPage;
