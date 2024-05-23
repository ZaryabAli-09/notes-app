import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { RiTaskLine } from "react-icons/ri";
import { RiSettingsLine } from "react-icons/ri";
import { useSelector } from "react-redux";
const Nav = () => {
  const activeTab = useLocation();
  const user = useSelector((state) => state.user.payload);

  return (
    <nav className="bg-black flex items-center p-3">
      <div className="flex items-center justify-center w-[90vw] space-x-8">
        <Link to={"/notes-page"}>
          <CgNotes
            className={` text-3xl hover:text-yellow-500 ${
              activeTab.pathname === "/notes-page"
                ? "text-yellow-500"
                : "text-neutral-400"
            }`}
          />
        </Link>
        <Link to={"/todo"}>
          <RiTaskLine
            className={` text-3xl hover:text-yellow-500 ${
              activeTab.pathname === "/todo"
                ? "text-yellow-500"
                : "text-neutral-400"
            }`}
          />
        </Link>
      </div>
      <div className="flex items-center justify-end w-[10vw] mr-1">
        <Link to={"/settings"}>
          {user ? (
            <img
              src={user.avatar}
              alt=""
              className="w-[30px] border border-yellow-600 rounded-full"
            />
          ) : (
            <RiSettingsLine
              className={` text-3xl hover:text-yellow-500 ${
                activeTab.pathname === "/settings"
                  ? "text-yellow-500"
                  : "text-neutral-400"
              }`}
            />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
