import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  console.log(user);
  const logout = async () => {
    setLogoutLoading(true);
    const res = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      setLogoutLoading(false);
      navigate("/");
    }
  };
  const deleteAccount = async () => {
    const res = await fetch(`/api/users/delete/${user._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      return alert(data.message);
    }
    if (res.ok) {
      navigate("/");
    }
  };
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
        <button
          onClick={logout}
          className="bg-yellow-500 p-2 w-32 rounded-md hover:bg-yellow-700 font-bold text-black uppercase text-xs"
        >
          {logoutLoading ? "Loading..." : "Logout"}
        </button>

        <button
          onClick={() => setDeletePopUp(true)}
          className="bg-yellow-500 p-2 w-32 rounded-md hover:bg-yellow-700 font-bold text-black uppercase text-xs"
        >
          Delete Account
        </button>
        {deletePopUp && (
          <div className="mx-auto relative w-[80%] text-sm -mt-40 h-40 bg-red-600 bg-opacity-80 rounded-lg p-6">
            <p className="text-white">
              Are you sure you want to delete this notes?
            </p>
            <div className="mt-7   flex items-center justify-center">
              <button
                className="bg-white p-2 text-black w-16 rounded-lg font-semibold hover:bg-green-700 mx-2"
                onClick={deleteAccount}
              >
                Yes
              </button>
              <button
                className="bg-white text-black p-2 w-16 rounded-lg font-semibold hover:bg-red-700 mx-2"
                onClick={() => setDeletePopUp(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
