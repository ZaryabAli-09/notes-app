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
    <nav className=" border-b flex items-center p-3">
      <div className="flex items-center justify-center w-[90vw] space-x-8">
        <Link to={"/notes-page"}>
          <CgNotes
            className={` text-3xl hover:text-yellow-400 ${
              activeTab.pathname === "/notes-page"
                ? "text-yellow-500"
                : "text-neutral-600"
            }`}
          />
        </Link>
        <Link to={"/todo"}>
          <RiTaskLine
            className={` text-3xl hover:text-yellow-400 ${
              activeTab.pathname === "/todo"
                ? "text-yellow-500"
                : "text-neutral-600"
            }`}
          />
        </Link>
      </div>
      <div className="flex items-center justify-end w-[50px] mr-1">
        <Link to={"/settings"}>
          {user ? (
            <img
              src={user.avatar}
              alt=""
              className="w-[30px]  border-black border-2 rounded-full hover:border-yellow-400"
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
