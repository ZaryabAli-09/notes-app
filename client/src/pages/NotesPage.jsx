import React, { useEffect, useState } from "react";
import Add from "../components/AddNoteBtn";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import AddNotePopUp from "../components/AddNotePopUp";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
const NotesPage = () => {
  const [addNotePopUp, setAddNotePopUp] = useState(false);
  const [notes, setNotes] = useState([]);
  const onAddNotePopUp = () => {
    return setAddNotePopUp(!addNotePopUp);
  };
  const user = useSelector((state) => state.user.payload);
  console.log(notes);
  const getNotes = async () => {
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
      console.log(data);
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

  return (
    <>
      <Nav />
      <div className="text-white">
        <div className="bg-black w-full flex items-center justify-center pb-3">
          <input
            type="text"
            className="w-3/4 bg-neutral-800 rounded-3xl text-xs p-3 pl-3 border-none outline-none"
            placeholder="Search notes"
          />
        </div>
        {addNotePopUp && (
          <button className="ml-5" onClick={() => setAddNotePopUp(false)}>
            <FaArrowAltCircleLeft className="text-xl text-yellow-400 " />
          </button>
        )}

        {addNotePopUp ? (
          <AddNotePopUp />
        ) : (
          <div className="notes p-4 flex flex-col space-y-3">
            {notes &&
              notes.map((note) => {
                return (
                  <Link to={"/notes-details"}>
                    <div className="note-1 bg-neutral-800 rounded-lg p-2">
                      <h3 className="font-bold text-sm ">{note.title}</h3>
                      <p
                        className="text-sm text-neutral-400"
                        dangerouslySetInnerHTML={{
                          __html: note && truncate(note.notesDescription, 32),
                        }}
                      ></p>
                      <div className="font-semibold text-xs text-neutral-500">
                        {note && new Date(note.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
        {!addNotePopUp && (
          <div className="cursor-pointer " onClick={onAddNotePopUp}>
            <Add />
          </div>
        )}
      </div>
    </>
  );
};

export default NotesPage;
