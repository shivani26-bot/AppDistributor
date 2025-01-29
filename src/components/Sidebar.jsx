import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogoutData } from "../redux/feature/authLogoutSlice";
import { HomeIcon, AppIcon } from "./Icons"; // Assuming you have these icons

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHomeClick = async (e) => {
    e.preventDefault(); // Prevent default navigation behavior

    try {
      // Dispatch the logout action to clear session data
      await dispatch(postLogoutData()).unwrap(); // unwrap allows us to handle errors if the action fails
      console.log("Logout successful");

      // Redirect to the home page after logout
      navigate("/");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div className="w-20 bg-gray-800 text-white h-full flex flex-col items-center py-4">
      <nav className="flex flex-col gap-6 p-2 items-center">
        {/* Home Link - Redirects to Landing Page and logs out */}
        <a
          href="/"
          onClick={handleHomeClick} // Trigger logout on click
          className="flex flex-col items-center text-white hover:bg-gray-700 p-2 rounded"
        >
          <HomeIcon />
          <span className="text-xs mt-1">Home</span> {/* Name below icon */}
        </a>

        {/* Apps Link - Navigate to Dashboard */}
        <a
          href="/dashboard"
          className="flex flex-col items-center text-white hover:bg-gray-700 p-2 rounded"
        >
          <AppIcon />
          <span className="text-xs mt-1">Apps</span> {/* Name below icon */}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
