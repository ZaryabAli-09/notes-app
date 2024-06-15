import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import TodoPage from "./pages/TodoPage";
import Settings from "./pages/Settings";
import NotesDetail from "./pages/NotesDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoutes from "./components/PrivateRoutes";
import CreateNotesPage from "./pages/CreateNotesPage";
import TodoCreatePage from "./pages/TodoCreatePage";
import EmailInvalidPage from "./emailVerificationPages/EmailInvalidPage";
import EmailVerifedPage from "./emailVerificationPages/EmailVerifedPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/your-email-is-verified-successfully"
          element={<EmailVerifedPage />}
        />
        <Route path="/your-email-is-invalid" element={<EmailInvalidPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/notes-page" element={<NotesPage />} />
          <Route
            path="/notes-page/create"
            element={<CreateNotesPage />}
          ></Route>
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/todo/create" element={<TodoCreatePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notes-details" element={<NotesDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
