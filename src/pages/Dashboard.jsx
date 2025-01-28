import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import { Button } from "@/components/ui/button";
import axios from "axios"; // Import axios
import Cookies from "js-cookie"; // Import Cookies to manage cookies
import { TrashIcon } from "@heroicons/react/solid"; // Import Trash Icon for delete button

const Dashboard = () => {
  const [userData, setUserData] = useState(null); // Assume this comes from some authentication logic
  const [dataChange, setDataChange] = useState(false); // Placeholder for tracking data changes
  const [selectedOS, setSelectedOS] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [releaseType, setReleaseType] = useState("");
  const [appName, setAppName] = useState("");
  const [appIcon, setAppIcon] = useState(null); // In case you decide to upload icon later
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [apps, setApps] = useState([]); // List of apps fetched from backend
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastVisible, setToastVisible] = useState(false); // State to control visibility of the toast

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of apps to display per page

  // Toggle side sheet visibility
  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);

  // Fetch applications from backend
  const fetchApplications = async () => {
    const token = Cookies.get("accessToken"); // Retrieve the access token from the cookie
    if (!token) {
      console.log("Access token is missing!");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/app/getApplication", // Replace with your backend API URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched apps:", response.data); // Log to check if data is coming correctly
      setApps(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApps([]); // In case of an error, ensure apps is set to an empty array
    }
  };

  // Fetch apps when the component mounts
  useEffect(() => {
    fetchApplications();
  }, []); // Run once on component mount

  // Filter apps based on search term (null/undefined safe)
  const filteredApps = apps.filter((app) => {
    return (
      (app.appName &&
        app.appName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.osType &&
        app.osType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.releaseType &&
        app.releaseType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.platformType &&
        app.platformType.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Pagination logic
  const indexOfLastApp = currentPage * rowsPerPage;
  const indexOfFirstApp = indexOfLastApp - rowsPerPage;
  const currentApps = filteredApps.slice(indexOfFirstApp, indexOfLastApp);

  const totalPages = Math.ceil(filteredApps.length / rowsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete an app
  const handleDeleteApp = async (appId) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      console.log("Access token is missing!");
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:8000/api/app/deleteApplication", // API URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Authorization header
          },
          data: { _id: appId }, // Send appId as a JSON object
        }
      );
      console.log("App deleted successfully:", response.data);
      fetchApplications(); // Re-fetch apps after deletion
      showToast("App deleted successfully!"); // Show success message
    } catch (error) {
      console.error("Error deleting app:", error);
      showToast("Error deleting app"); // Show error message
    }
  };

  // Add a new app
  const handleAddNewApp = async (e) => {
    e.preventDefault();

    try {
      // Prepare data as a JSON object instead of FormData
      const appData = {
        appName,
        releaseType,
        osType: selectedOS,
        platformType: selectedPlatform,
        appIcon: appIcon ? appIcon.name : null, // Send the icon's file name or URL
      };

      const token = Cookies.get("accessToken"); // Retrieve the access token from the cookie
      console.log("token", token);

      if (!token) {
        console.log("Access token is missing!");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/app/registerApplication", // Replace with your backend API URL
        appData,
        {
          headers: {
            "Content-Type": "application/json", // Set content type for JSON
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      );

      // Handle successful response
      console.log("App added successfully:", response.data);

      // After a successful response, fetch the updated apps list
      fetchApplications(); // Refresh apps list after adding a new app

      // Clear form fields
      setAppName("");
      setReleaseType("");
      setSelectedOS("");
      setSelectedPlatform("");
      setAppIcon(null); // Clear icon
      toggleSheet(); // Close the side sheet
      showToast("App added successfully!"); // Show success message
    } catch (error) {
      console.error("Error:", error);
      showToast("Error adding app"); // Show error message
    }
  };

  // Show toast message for 5 seconds
  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false); // Hide the toast after 5 seconds
    }, 5000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow bg-gray-100">
        {/* Header with App Title and Button */}
        <div className="w-full bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Apps
            </h2>
            <Button onClick={toggleSheet}>Add New App</Button>
          </div>
        </div>

        {/* Box above the table */}
        <div className="w-full bg-white shadow-md p-4">
          <div className="flex gap-4 w-full justify-between">
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:max-w-xs"
              placeholder="Search Apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedOS}
              onChange={(e) => setSelectedOS(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:max-w-xs"
            >
              <option value="">Select OS</option>
              <option value="ios">iOS</option>
              <option value="android">Android</option>
            </select>
            <select
              value={releaseType}
              onChange={(e) => setReleaseType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:max-w-xs"
            >
              <option value="">Release Type</option>
              <option value="Alpha">Alpha</option>
              <option value="Beta">Beta</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Production">Production</option>
              <option value="Store">Store</option>
            </select>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:max-w-xs"
            >
              <option value="">Select Platform</option>
              <option value="java">Java</option>
              <option value="kotlin">Kotlin</option>
              <option value="react-native">React Native</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-grow overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-0 border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left border-b border-gray-300">
                  App Name
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-300">
                  OS
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-300">
                  Release Type
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-300">
                  Platform
                </th>
                <th className="px-4 py-2 text-left border-b border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentApps.length > 0 ? (
                currentApps.map((app, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-300">
                      <Link
                        to={`/releases/${app.appName}/${app._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {app.appName}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {app.osType}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {app.releaseType}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {app.platformType}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      <button
                        onClick={() => handleDeleteApp(app._id)} // Pass app._id to handleDeleteApp
                        className="text-black hover:text-red-700"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 border-b border-gray-300 text-center"
                  >
                    No apps available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center p-4">
          <Button
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>

        {/* Side Sheet */}
        <div
          className={`fixed top-0 right-0 h-full bg-white w-80 shadow-lg transition-transform transform ${
            isSheetOpen ? "translate-x-0" : "translate-x-full"
          } ease-in-out duration-300`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Add New App</h2>
            <Button onClick={toggleSheet}>Close</Button>
          </div>

          <div className="p-4">
            <form onSubmit={handleAddNewApp}>
              {/* App Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium">App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter app name"
                  required
                />
              </div>

              {/* App Icon (optional) */}
              <div className="mb-4">
                <label className="block text-sm font-medium">App Icon</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAppIcon(e.target.files[0])}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Release Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Release Type
                </label>
                <select
                  value={releaseType}
                  onChange={(e) => setReleaseType(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Release Type</option>
                  <option value="Alpha">Alpha</option>
                  <option value="Beta">Beta</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Production">Production</option>
                  <option value="Store">Store</option>
                </select>
              </div>

              {/* OS Radio Button */}
              <div className="mb-4">
                <label className="block text-sm font-medium">OS Type</label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="osType"
                      value="ios"
                      checked={selectedOS === "ios"}
                      onChange={(e) => setSelectedOS(e.target.value)}
                    />
                    iOS
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="osType"
                      value="android"
                      checked={selectedOS === "android"}
                      onChange={(e) => setSelectedOS(e.target.value)}
                    />
                    Android
                  </label>
                </div>
              </div>

              {/* Platform */}
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Platform Type
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Platform</option>
                  <option value="java">Java</option>
                  <option value="kotlin">Kotlin</option>
                  <option value="react-native">React Native</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="mt-4 text-right">
                <Button type="submit">Add App</Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {toastVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-black text-white p-4 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
