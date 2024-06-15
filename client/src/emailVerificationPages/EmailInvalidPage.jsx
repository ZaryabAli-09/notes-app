import React from "react";
import { useNavigate } from "react-router-dom";
import cross from "../assets/cross.webp";
const EmailInvalidPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-yellow-300 w-full h-[100vh] flex items-center justify-center">
      <div className="bg-yellow-400 flex flex-col items-center space-y-5 p-10 rounded-lg">
        <img className="w-32" src={cross} alt="" />
        <h3 className="font-bold">
          Error occured.your verification link is invalid or expire!!
        </h3>
        <p className="font-bold">Please register again with valid email</p>
        <button
          onClick={() => navigate("/")}
          className="relative px-6 py-3 font-bold text-black bg-yellow-500 rounded-lg group"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default EmailInvalidPage;
