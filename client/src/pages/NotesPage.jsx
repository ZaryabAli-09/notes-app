import React, { useEffect, useState } from "react";
import Add from "../components/AddNoteBtn";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { editNotesAction } from "../reduxStore/store";
import searchAnimation from "../assets/searchanimation.gif";
const NotesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const res = await fetch(`/api/notes/get-notes/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(data.notesData);
      }
      if (!res.ok) {
        return alert(data.message);
      }
    } catch (error) {
      return alert(error.message);
    }
  };
  const truncate = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 1) + "...";
    } else {
      return str;
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  function getNoteId(id) {
    return dispatch(editNotesAction.editNotes(id));
  }
  return (
    <>
      <Nav />
      <div className="text-white">
        {/* <div className="bg-black w-full flex items-center justify-center pb-3">
          <input
            type="text"
            className="w-3/4 bg-neutral-800 rounded-3xl text-xs p-3 pl-3 border-none outline-none"
            placeholder="Search notes"
          />
        </div> */}

        <div className="notes p-4 flex flex-col space-y-3">
          {notes.length > 0 ? (
            notes.map((note) => {
              return (
                <Link
                  key={note._id}
                  to={"/notes-details"}
                  onClick={() => getNoteId(note._id)}
                >
                  <div className="note-1 bg-neutral-200 rounded-lg p-2">
                    <h3 className="font-bold text-sm text-black ">
                      {note.title.charAt(0).toUpperCase() + note.title.slice(1)}
                    </h3>
                    <p
                      className="text-sm text-black"
                      dangerouslySetInnerHTML={{
                        __html: note && truncate(note.notesDescription, 12),
                      }}
                    ></p>
                    <div className="font-semibold text-xs text-neutral-500">
                      {note && new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-full flex flex-col items-center justify-center ">
              <img src={searchAnimation} alt="" className="w-[150px] mr-14  " />
            </div>
          )}
        </div>

        <div
          className="cursor-pointer "
          onClick={() => navigate("/notes-page/create")}
        >
          <Add />
        </div>
      </div>
    </>
  );
};

export default NotesPage;
