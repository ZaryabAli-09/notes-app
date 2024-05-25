import React from "react";
import { useSelector } from "react-redux";
import NotesDetail from "../pages/NotesDetail";
import NotesPage from "../pages/NotesPage";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TodoPage from "../pages/TodoPage";
import Settings from "../pages/Settings";
import CreateNotesPage from "../pages/CreateNotesPage";
const PrivateRoutes = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  return user ? (
    <>
      {location.pathname === "/notes-page" ? (
        <NotesPage />
      ) : location.pathname === "/todo" ? (
        <TodoPage />
      ) : location.pathname === "/settings" ? (
        <Settings />
      ) : location.pathname === "/notes-details" ? (
        <NotesDetail />
      ) : location.pathname === "/notes-page/create" ? (
        <CreateNotesPage />
      ) : (
        ""
      )}
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default PrivateRoutes;
