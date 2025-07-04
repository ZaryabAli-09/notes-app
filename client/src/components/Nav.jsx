import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { RiTaskLine, RiSettingsLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Nav = () => {
  const activeTab = useLocation();
  const user = useSelector((state) => state.user.payload);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-row justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl text-yellow-600 font-bold italic tracking-wide">
            KEEP
          </h1>

          {/* Navigation Links */}
          <div className="flex gap-6 items-center">
            <NavItem
              to="/notes-page"
              icon={<CgNotes />}
              label="Notes"
              activePath={activeTab.pathname}
            />
            <NavItem
              to="/todo"
              icon={<RiTaskLine />}
              label="Tasks"
              activePath={activeTab.pathname}
            />
          </div>

          {/* User or Settings */}
          <div>
            <Link to="/settings" aria-label={user ? "Profile" : "Settings"}>
              {user ? (
                <div className="relative group">
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500 shadow-sm hover:scale-105 transition-all duration-300"
                  />
                  {activeTab.pathname === "/settings" && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full"></span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center group">
                  <RiSettingsLine
                    className={`text-3xl ${
                      activeTab.pathname === "/settings"
                        ? "text-yellow-500"
                        : "text-gray-400 group-hover:text-yellow-400"
                    } transition-all duration-300`}
                  />
                  <span
                    className={`text-xs mt-1 ${
                      activeTab.pathname === "/settings"
                        ? "text-yellow-500 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Settings
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, label, activePath }) => {
  const isActive = activePath === to;

  return (
    <Link to={to} className="group flex flex-col items-center">
      <div
        className={`text-3xl p-2 rounded-full transition-all duration-300 ${
          isActive
            ? "bg-yellow-100 text-yellow-600 shadow-sm"
            : "text-gray-500 group-hover:text-yellow-500"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-xs mt-1 ${
          isActive ? "text-yellow-600 font-medium" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default Nav;
