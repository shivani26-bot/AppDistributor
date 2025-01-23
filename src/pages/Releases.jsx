import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";

import { columns } from "@/schemas/releaseColumns";
import { ReleaseTable } from "@/components/ReleaseTable";

function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "a1b2c3d4",
      release: "1.0.0",
      version: "1.0.0",
      fileExtension: ".zip",
    },
    {
      id: "e5f6g7h8",
      release: "1.1.0",
      version: "1.1.0",
      fileExtension: ".tar.gz",
    },
    {
      id: "i9j0k1l2",
      release: "2.0.0",
      version: "2.0.0",
      fileExtension: ".exe",
    },
    {
      id: "m3n4o5p6",
      release: "2.1.0",
      version: "2.1.0",
      fileExtension: ".dmg",
    },
    {
      id: "q7r8s9t0",
      release: "3.0.0",
      version: "3.0.0",
      fileExtension: ".apk",
    },
    {
      id: "u1v2w3x4",
      release: "3.1.0",
      version: "3.1.0",
      fileExtension: ".iso",
    },
    {
      id: "y5z6a7b8",
      release: "4.0.0",
      version: "4.0.0",
      fileExtension: ".bin",
    },
    {
      id: "c9d0e1f2",
      release: "4.1.0",
      version: "4.1.0",
      fileExtension: ".pkg",
    },
    {
      id: "g3h4i5j6",
      release: "5.0.0",
      version: "5.0.0",
      fileExtension: ".deb",
    },
    {
      id: "k7l8m9n0",
      release: "5.1.0",
      version: "5.1.0",
      fileExtension: ".rpm",
    },
  ];
  // ...
}

const Releases = () => {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const data = getData(); // for table
  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    const fileSize = (fileInputRef.current.files[0].size / 1024).toFixed(2);
    console.log("file info", fileInputRef.current.files[0].size);
    console.log("fr", fileInputRef);
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "apk" || fileExtension === "aab") {
        setFileName(file.name);
        setFileSize(fileSize);
        setError("");
      } else {
        setFileName("");
        setError(
          `.${fileExtension.toLowerCase()} is not supported for this OS`
        );
      }
    }
  };

  const handleSubmit = () => {
    setFileName("");
    setError("");
    fileInputRef.current.value = "";
  };
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        {/* <div className="flex justify-between px-10 py-5 w-full "> */}
        <div className="flex flex-col w-full p-10">
          <div className="flex justify-between items-center mb-6">
            <p className="text-3xl font-bold">Releases</p>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="text-white text-lg px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
                >
                  New Release
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>New Release</SheetTitle>

                  <SheetTitle>Upload</SheetTitle>
                </SheetHeader>
                <hr className="my-2 border-t-2 border-gray-300" />
                <div className="grid gap-4 py-4 mt-5">
                  <Label htmlFor="file-upload" className="text-md font-normal">
                    Upload a Build
                  </Label>
                  <div className="flex items-center">
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex items-center justify-center h-40 w-full bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-700 font-semibold hover:border-blue-500 hover:bg-blue-100 transition-all"
                    >
                      <div className="text-xl    text-left">
                        <p>Release:</p>
                        {fileName ? (
                          <div className="h-30 w-full">
                            <p>{fileName}</p>
                            <p>Size of File: {fileSize} MB</p>
                          </div>
                        ) : error ? (
                          <p className="text-red-500">{error}</p>
                        ) : (
                          <p>Upload (.apk or .aab file)</p>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" onClick={handleSubmit}>
                      Click To Upload
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          {/* <div className="flex flex-col justify-center items-center h-screen py-16">
            <img className="w-60 h-50 " src="/empty-box.png" />
            <p className="text-2xl font-bold leading-8">
              You have no releases yet
            </p>
            <p>Start distributing your app among your teams and testers.</p>
          </div> */}

          <div className="container mx-auto py-10">
            <ReleaseTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Releases;
