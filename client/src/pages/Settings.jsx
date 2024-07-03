import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.payload);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const logout = async () => {
    setLogoutLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/logout`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return alert(data.message);
    }
    if (res.ok) {
      setLogoutLoading(false);
      navigate("/");
    }
  };
  const deleteAccount = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/delete/${user._id}`,
      {
        method: "DELETE",
      }
    );
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
      <h1 className="text-2xl text-yellow-700 font-extrabold italic ">KEEP</h1>
      <p className="text-md text-yellow-700 font-semibold">
        Make your notes and set todo's easily with KEEP
      </p>
      <br />
      <hr />
      <div className="info mt-5">
        <h3 className="text-md text-yellow-700 font-semibold">
          {user.username.toUpperCase()}
        </h3>
        <h3 className="text-sm text-yellow-700 font-semibold">
          {user.email.toUpperCase()}
        </h3>
      </div>
      <br />
      <hr />

      <div className="mt-10">
        <h3 className="text-xl text-yellow-700 font-bold">Privacy Policy</h3>
        <p className="text-sm text-yellow-700 font-semibold">
          At KEEP, we value your privacy and are committed to protecting your
          personal information. We collect personal data (like name, email) and
          usage data to provide and improve our services. Your information is
          secured with us and shared only when necessary, such as for legal
          reasons or business transactions. You have rights over your data,
          including access, correction, and deletion. We may update this policy,
          so please review it periodically. For any questions, contact us at
          khanzaryab249@gmail.com.
        </p>
      </div>
      <br />
      <hr />
      {deletePopUp && (
        <div className="mx-auto relative bg-opacity-70 top-16   w-[80%] text-sm -mt-40 h-40 bg-red-600  rounded-lg p-6">
          <p className="text-white text-center">
            Are you sure you want to delete this account?
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
      <div className="mt-10 flex flex-col space-y-1 ">
        <button
          onClick={logout}
          className="bg-yellow-500 p-2 w-32 rounded-md hover:bg-yellow-400 font-bold text-black uppercase text-xs"
        >
          {logoutLoading ? "Loading..." : "Logout"}
        </button>

        <button
          onClick={() => setDeletePopUp(true)}
          className="bg-yellow-500 p-2 w-32 rounded-md hover:bg-yellow-400 font-bold text-black uppercase text-xs"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
