import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { editNotesAction } from "../reduxStore/store";
import searchAnimation from "../assets/searchanimation.gif";
import Add from "../components/AddNoteBtn";

const NotesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getNotes = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notes/get-notes/${user._id}`,
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
        setNotes(data.notesData);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const truncate = (str, maxLength) => {
    if (!str) return "";
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 1) + "...";
    }
    return str;
  };

  useEffect(() => {
    getNotes();
  }, []);

  const getNoteId = (id) => {
    dispatch(editNotesAction.editNotes(id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />

      <main className="container mx-auto px-4 py-6 ">
        {/* Search Bar (commented out but improved) */}
        {/* <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-white rounded-full py-3 px-5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Search notes..."
            />
          </div>
        </div> */}

        {/* Notes Grid */}
        <div className="mb-16">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <img
                src={searchAnimation}
                alt="Loading notes"
                className="w-32 h-32 object-contain"
              />
              <p className="mt-4 text-gray-600">Loading your notes...</p>
            </div>
          ) : notes && notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 font-medium">No notes found</p>
              <button
                onClick={() => navigate("/notes-page/create")}
                className="mt-4 px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400  transition-colors"
              >
                Create Your First Note
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes?.map((note) => (
                <Link
                  key={note._id}
                  to="/notes-details"
                  onClick={() => getNoteId(note._id)}
                  className="block"
                >
                  <div className="bg-white rounded-lg shadow-sm p-4 h-full hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
                      {note.title.charAt(0).toUpperCase() + note.title.slice(1)}
                    </h3>
                    <div
                      className="text-gray-600 text-sm mb-3 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: truncate(note.notesDescription, 100),
                      }}
                    />
                    <div className="text-xs text-gray-400">
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-6 right-6 z-10">
          <button
            onClick={() => navigate("/notes-page/create")}
            // className="w-14 h-14 bg-yellow-500 rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-400 transition-colors"
            aria-label="Add new note"
          >
            <Add />
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotesPage;
