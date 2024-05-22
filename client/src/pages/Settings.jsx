import React from "react";
import { useSelector } from "react-redux";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);
  console.log(user);
  return (
    <div className="text-white p-5">
      <button className="mb-5">
        <FaArrowAltCircleLeft
          className="text-2xl text-yellow-500 "
          onClick={() => navigate("/notes-page")}
        />
      </button>
      <h1 className="text-2xl text-yellow-600 font-extrabold italic ">KEEP</h1>
      <p className="text-md text-yellow-600 font-semibold">
        Make your notes and set todo's easily with KEEP
      </p>
      <br />
      <hr />
      <div className="info mt-10">
        <h3 className="text-xl text-yellow-600 font-semibold">
          {user.username.toUpperCase()}
        </h3>
        <h3 className="text-md text-yellow-600 font-semibold">
          {user.email.toUpperCase()}
        </h3>
      </div>
      <br />
      <hr />

      <div className="mt-10">
        <h3 className="text-xl text-yellow-600 font-bold">Privacy Policy</h3>
        <h3 className="text-md text-yellow-600 font-semibold">......</h3>
      </div>
      <br />
      <hr />
      <div className="mt-10 flex flex-col space-y-1 ">
        <button className="bg-yellow-500 p-2 w-32 rounded-md hover:bg-yellow-700 font-bold text-black uppercase text-xs">
          Logout
        </button>
        <button className="bg-yellow-500 p-2 w-32 rounded-md hover:bg-yellow-700 font-bold text-black uppercase text-xs">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
