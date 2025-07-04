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
  const [err, setErr] = useState(null);
  const [deletePopUp, setDeletePopUp] = useState(false);

  const getNote = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/get-specific-note/${
          noteId.payload
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setNotesDescription(data.notesData.notesDescription);
        setTitle(data.notesData.title);
      } else {
        setErr(data.message);
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  const updateNotes = async () => {
    try {
      if (!title.trim()) {
        setErr("Title is required");
        return;
      }

      const formData = {
        title,
        notesDescription,
      };

      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/edit-note/${noteId.payload}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTimeout(() => {
          navigate("/notes-page");
        }, 1000);
      }
      setErr(data.message);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotes = async () => {
    try {
      setLoading2(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/delete-note/${
          noteId.payload
        }`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTimeout(() => {
          navigate("/notes-page");
        }, 1000);
      }
      setErr(data.message);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading2(false);
      setDeletePopUp(false);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/notes-page")}
            className="flex items-center text-yellow-600 hover:text-yellow-700"
          >
            <FaArrowAltCircleLeft className="text-2xl mr-2" />
            <span className="font-medium">Back to Notes</span>
          </button>
        </div>

        {/* Title Input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Note Title"
          className="w-full border-b-2 border-gray-300 outline-none py-3 px-2 placeholder-gray-400 font-semibold focus:border-yellow-500 mb-6 text-lg"
        />

        {/* Editor */}
        <div className="mb-8">
          <ReactQuill
            value={notesDescription}
            onChange={setNotesDescription}
            className="h-64 mb-16"
            theme="snow"
            placeholder="Write your note here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={updateNotes}
            disabled={loading}
            className={`flex-1 py-3 px-6 rounded-lg font-bold text-white bg-yellow-500 hover:bg-yellow-600 transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Note"}
          </button>

          <button
            onClick={() => setDeletePopUp(true)}
            disabled={loading2}
            className={`flex-1 py-3 px-6 rounded-lg font-bold text-white bg-red-500 hover:bg-red-600 transition-colors ${
              loading2 ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading2 ? "Deleting..." : "Delete Note"}
          </button>
        </div>

        {/* Error Message */}
        {err && (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center">
            {err}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletePopUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
              <p className="mb-6">
                Are you sure you want to delete this note? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeletePopUp(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteNotes}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNotePopUp;
