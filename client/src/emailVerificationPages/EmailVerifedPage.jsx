import React from "react";
import { useNavigate } from "react-router-dom";
import check from "../assets/check.webp";
const EmailVerifedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-yellow-300 w-full h-[100vh] flex items-center justify-center">
      <div className="bg-yellow-400 flex flex-col items-center space-y-5 p-10 rounded-lg">
        <img className="w-32" src={check} alt="" />
        <h3 className="font-bold">Your Email Is Verified Successfully</h3>
        <button
          onClick={() => navigate("/sign-in")}
          className="relative px-6 py-3 font-bold text-black bg-yellow-500 rounded-lg group"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerifedPage;
