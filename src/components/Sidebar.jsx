import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, AppIcon, ReleaseIcon, SettingsIcon } from "./Icons";

const Sidebar = () => {
  return (
    <div className="w-20 bg-gray-800 text-white h-full flex flex-col items-center py-4">
      <nav className="flex flex-col gap-6 p-2 items-center">
        {/* Home Link - Redirects to Landing Page */}
        <Link
          to="/"
          className="flex flex-col items-center text-white hover:bg-gray-700 p-2 rounded"
        >
          <HomeIcon />
          <span className="text-xs mt-1">Home</span> {/* Name below icon */}
        </Link>

        {/* Apps Link - Navigate to Dashboard */}
        <Link
          to="/dashboard"
          className="flex flex-col items-center text-white hover:bg-gray-700 p-2 rounded"
        >
          <AppIcon />
          <span className="text-xs mt-1">Apps</span> {/* Name below icon */}
        </Link>

        {/* New Releases Link */}
        <Link
          to="/newrelease"
          className="flex flex-col items-center text-white hover:bg-gray-700 p-2 rounded"
        >
          <ReleaseIcon />
          <span className="text-xs mt-1">New Releases</span>{" "}
          {/* Name below icon */}
        </Link>

        {/* Settings Link */}
        <Link
          to="/settings"
          className="flex flex-col items-center text-white hover:bg-gray-700 p-2 rounded"
        >
          <SettingsIcon />
          <span className="text-xs mt-1">Settings</span> {/* Name below icon */}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
