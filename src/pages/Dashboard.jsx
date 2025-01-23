import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import { Button } from "@/components/ui/button";
import axios from "axios"; // Import axios

const Dashboard = () => {
  const [selectedOS, setSelectedOS] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [releaseType, setReleaseType] = useState("");
  const [appName, setAppName] = useState("");
  const [appIcon, setAppIcon] = useState(null); // In case you decide to upload icon later
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);

  // Define the handleIconChange function to update the appIcon state
  const handleIconChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setAppIcon(file); // Update the appIcon state with the selected file
  };

  const handleAddNewApp = async (e) => {
    e.preventDefault();

    // Prepare data as a JSON object instead of FormData
    const appData = {
      appName,
      releaseType,
      osType: selectedOS,
      platformType: selectedPlatform,
      // If you want to send the app icon URL or other image metadata, you can include it here
      // For instance, if the icon URL is stored, you can pass that as well.
      appIcon: appIcon ? appIcon.name : null, // Assuming you want to send the icon's file name or URL
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/app/registerApplication", // Replace with your backend API URL
        appData,
        {
          headers: {
            "Content-Type": "application/json", // Set content type for JSON
          },
        }
      );

      // Handle successful response
      console.log("App added successfully:", response.data);

      // After a successful response, add the new app to the state
      setApps([
        ...apps,
        {
          name: appName,
          os: selectedOS,
          releaseType,
          platform: selectedPlatform,
        },
      ]);

      // Clear form fields
      setAppName("");
      setReleaseType("");
      setSelectedOS("");
      setSelectedPlatform("");
      setAppIcon(null); // Clear icon
      toggleSheet(); // Close the side sheet
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show error message to the user)
    }
  };

  const filteredApps = apps.filter((app) => {
    return (
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.os.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.releaseType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-300">
                    <Link
                      to={`/newrelease/${app.name}`}
                      className="text-blue-500 hover:underline"
                    >
                      {app.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {app.os}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {app.releaseType}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {app.platform}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  onChange={handleIconChange} // Handle file change event here
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
                <label className="block text-sm font-medium">Select OS</label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="ios"
                      checked={selectedOS === "ios"}
                      onChange={() => setSelectedOS("ios")}
                      className="mr-2"
                    />
                    iOS
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="android"
                      checked={selectedOS === "android"}
                      onChange={() => setSelectedOS("android")}
                      className="mr-2"
                    />
                    Android
                  </label>
                </div>
              </div>

              {/* Platform Radio Button */}
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Select Platform
                </label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="java"
                      checked={selectedPlatform === "java"}
                      onChange={() => setSelectedPlatform("java")}
                      className="mr-2"
                    />
                    Java
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="kotlin"
                      checked={selectedPlatform === "kotlin"}
                      onChange={() => setSelectedPlatform("kotlin")}
                      className="mr-2"
                    />
                    Kotlin
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="react-native"
                      checked={selectedPlatform === "react-native"}
                      onChange={() => setSelectedPlatform("react-native")}
                      className="mr-2"
                    />
                    React Native
                  </label>
                </div>
              </div>

              <Button type="submit">Add new App</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
