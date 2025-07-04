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
        credentials: "include",
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
    <div className="min-h-screen bg-gray-900 p-6 sm:p-8 md:p-10">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <button
          onClick={() => navigate("/notes-page")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Go back"
        >
          <FaArrowAltCircleLeft className="text-2xl text-yellow-500" />
          <span className="text-yellow-500 text-sm font-medium hidden sm:block">
            Back
          </span>
        </button>
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl text-yellow-600 font-bold">
            KEEP
          </h1>
          <p className="text-sm sm:text-base text-yellow-600 font-medium">
            Organize notes and tasks with ease
          </p>
        </div>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* User Info Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          {user.avatar && (
            <img
              src={user.avatar}
              alt="User avatar"
              className="w-12 h-12 rounded-full border-2 border-yellow-500 object-cover"
            />
          )}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-yellow-600">
              {user.username.toUpperCase()}
            </h3>
            <p className="text-sm sm:text-base text-yellow-600">
              {user.email.toLowerCase()}
            </p>
          </div>
        </div>
        <hr className="border-gray-700 my-4" />
      </div>

      {/* Privacy Policy Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-md">
        <h3 className="text-xl font-bold text-yellow-600 mb-4">
          Privacy Policy
        </h3>
        <div className="prose prose-sm text-yellow-600">
          <p className="mb-4">
            At KEEP, we value your privacy and are committed to protecting your
            personal information. We collect personal data (like name, email)
            and usage data to provide and improve our services.
          </p>
          <p className="mb-4">
            Your information is secured with us and shared only when necessary,
            such as for legal reasons or business transactions.
          </p>
          <p>
            You have rights over your data, including access, correction, and
            deletion. We may update this policy, so please review it
            periodically. For any questions, contact us at
            khanzaryab249@gmail.com.
          </p>
        </div>
        <hr className="border-gray-700 my-4" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={logout}
          disabled={logoutLoading}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors duration-200 flex-1 max-w-xs mx-auto"
        >
          {logoutLoading ? "Signing Out..." : "Sign Out"}
        </button>

        <button
          onClick={() => setDeletePopUp(true)}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors duration-200 flex-1 max-w-xs mx-auto"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deletePopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to permanently delete your account? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeletePopUp(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
