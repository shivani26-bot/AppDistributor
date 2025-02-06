import React, { useEffect, useRef, useState } from "react";
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

// import { columns } from "dummy/releaseColumns";
// import { ReleaseTable } from "dummy/ReleaseTable";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import uploadReleaseSchema from "@/schemas/uploadReleaseSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader, BeatLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import {
  clearBuildUrlData,
  postUploadBuildData,
} from "@/redux/feature/uploadBuildDataSlice";
import { postReleaseData } from "@/redux/feature/releaseDataSlice";
import ReleaseTable from "@/components/ReleaseTable";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReleaseData } from "@/redux/feature/getReleaseDataSlice";
import Cookies from "js-cookie";
// function getData() {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "a1b2c3d4",
//       release: "1.0.0",
//       version: "1.0.0",
//       fileExtension: ".zip",
//     },
//     {
//       id: "e5f6g7h8",
//       release: "1.1.0",
//       version: "1.1.0",
//       fileExtension: ".tar.gz",
//     },
//     {
//       id: "i9j0k1l2",
//       release: "2.0.0",
//       version: "2.0.0",
//       fileExtension: ".exe",
//     },
//     {
//       id: "m3n4o5p6",
//       release: "2.1.0",
//       version: "2.1.0",
//       fileExtension: ".dmg",
//     },
//     {
//       id: "q7r8s9t0",
//       release: "3.0.0",
//       version: "3.0.0",
//       fileExtension: ".apk",
//     },
//     {
//       id: "u1v2w3x4",
//       release: "3.1.0",
//       version: "3.1.0",
//       fileExtension: ".iso",
//     },
//     {
//       id: "y5z6a7b8",
//       release: "4.0.0",
//       version: "4.0.0",
//       fileExtension: ".bin",
//     },
//     {
//       id: "c9d0e1f2",
//       release: "4.1.0",
//       version: "4.1.0",
//       fileExtension: ".pkg",
//     },
//     {
//       id: "g3h4i5j6",
//       release: "5.0.0",
//       version: "5.0.0",
//       fileExtension: ".deb",
//     },
//     {
//       id: "k7l8m9n0",
//       release: "5.1.0",
//       version: "5.1.0",
//       fileExtension: ".rpm",
//     },
//   ];
//   // ...
// }

const Releases = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { appName, appId } = useParams();
  const navigate = useNavigate();
  console.log(appName, appId);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");

  const items = useSelector((state) => state.getReleaseData.items);
  console.log("item", items);
  // const success = useSelector((state) => state.getReleaseData.data?.success);
  // console.log("data", success);
  const notifySuccess = () => {
    toast.success("Build Uploaded successfully"),
      {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "custom-toast-container",
      };
  };

  const notifyFailure = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      className: "custom-toast-container",
    });

  const notifyReleaseSuccess = () => {
    toast.success("Release Uploaded successfully"),
      {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "custom-toast-container",
      };
  };

  const notifyReleaseFailure = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      className: "custom-toast-container",
    });
  // const [releaseData, setReleaseData] = useState({
  //   file: "",
  //   version: "",
  //   releaseNotes: "",
  // });

  const { buildUrlData } = useSelector((state) => state.uploadBuildData);

  console.log("url", buildUrlData?.data || "No data available");
  const fileInputRef = useRef(null);
  // const data = getData(); // for table

  const form = useForm({
    resolver: zodResolver(uploadReleaseSchema),

    defaultValues: {
      // file: "",
      version: "",
      releaseNote: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchReleaseData({ accessToken, appId }));
    }
  }, [dispatch, accessToken, appId]);

  const triggerFetchData = () => {
    if (accessToken) {
      dispatch(fetchReleaseData({ accessToken, appId }));
    }
  };
  const onSubmit = (formData) => {
    setFileName("");
    setError("");
    fileInputRef.current.value = "";
    console.log("fd", formData);
    const { version, releaseNote } = formData;
    console.log("bdvrn", buildUrlData, version, releaseNote);
    // notifyReleaseSuccess();
    console.log("url2", buildUrlData?.data || "No data available");
    if (buildUrlData && buildUrlData?.data) {
      console.log("url3", buildUrlData?.data || "No data available");
      // notifyReleaseSuccess();

      dispatch(
        postReleaseData({
          build: buildUrlData.data,
          version,
          releaseNote,
          appId,
          fileSize,
          fileExtension,
        })
      ).then((response) => {
        {
          if (!response.payload.success) {
            notifyReleaseFailure(response.payload.message);
          } else {
            notifyReleaseSuccess();
            triggerFetchData();
            dispatch(clearBuildUrlData());
            reset({
              version: "",
              releaseNote: "",
            }); //resets the version and release note fields
          }
        }
      });
    }
  };
  const fileUpload = () => {
    const file = fileInputRef.current.files[0]; //byte to mb we are converting
    const fileSize = (fileInputRef.current.files[0].size / 1024 / 1024).toFixed(
      2
    );
    console.log("file ", fileInputRef.current.files[0]);
    console.log("file size", fileInputRef.current.files[0].size);
    console.log("fir", fileInputRef);

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      setFileName(file.name);
      setFileSize(fileSize);
      setFileExtension(fileExtension);

      setError("");
      if (
        fileExtension === "apk" ||
        fileExtension === "ipa" ||
        fileExtension === "dmg"
      ) {
        setIsUploading(true);

        dispatch(postUploadBuildData(file)).then((response) => {
          console.log(response);
          if (!response.payload.success) {
            notifyFailure(response.payload.message);
          } else {
            notifySuccess();
            setIsUploading(false);
          }
        });
      } else {
        setFileName("");
        setError(
          `.${fileExtension.toLowerCase()} is not supported for this OS`
        );
      }
    }
    // setReleaseData({ ...releaseData, file: file });
  };

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   const { name, value } = event.target;
  //   setReleaseData({ ...data, [name]: value });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("formdata", releaseData);
  //   setFileName("");
  //   setError("");
  //   fileInputRef.current.value = "";
  // };
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

                <Label htmlFor="file-upload" className="text-md font-normal">
                  Upload a Build: <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center">
                  {/* The <label> element in HTML is used to associate a label with a form element (like <input>, <textarea>, <select>, etc.). When you use the htmlFor attribute on the <label>, it links the label to a specific input element by matching the value of htmlFor with the id of the input element. */}

                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-start justify-start p-2 h-35 w-full bg-gray-200 border-2  border-gray-300 rounded-lg text-center text-gray-700 font-semibold hover:border-blue-500 hover:bg-blue-100 transition-all"
                  >
                    {isUploading && (
                      <BarLoader
                        width="100%"
                        className="mb-2"
                        color="#36d7b7"
                      />
                    )}

                    {!isUploading && (
                      <input
                        name="file"
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        className="hidden"
                        required
                        onChange={fileUpload}
                      />
                    )}

                    <div className="text-xl    text-left">
                      {fileName ? (
                        <div className="h-30 w-full">
                          <p>Build:</p>
                          <p>{fileName}</p>
                          <p>Size of File: {fileSize} MB</p>
                        </div>
                      ) : error ? (
                        <div>
                          <p>Release:</p>
                          <p className="text-red-500">{error}</p>
                        </div>
                      ) : (
                        <div>
                          <p>Release:</p>
                          <p>Upload (.apk or .ipa or .dmg file)</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="version"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className=" text-md">
                              Version: <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Version"
                                required
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-4 mb-4">
                      <FormField
                        control={form.control}
                        name="releaseNote"
                        className="mt-4"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className=" text-md">
                              Release Note:{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              {/* <Input placeholder="Release Note..." {...field} /> */}
                              <textarea
                                required
                                placeholder="Release Note..."
                                {...field}
                                rows="5" // Adjust rows to set the height of the textarea
                                className="w-full p-2 border border-gray-300 rounded-md resize-none"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* <SheetFooter> */}
                    {/* <SheetClose asChild> */}
                    {/* <BeatLoader /> */}

                    <Button
                      type="submit"
                      disabled={
                        !buildUrlData?.data ||
                        !form.watch("version") ||
                        !form.watch("releaseNote")
                      }
                      className="w-full"
                    >
                      Upload
                    </Button>

                    {/* </SheetClose> */}
                    {/* </SheetFooter> */}

                    {/* <Button type="submit" className="w-full">
                      Upload
                    </Button> */}
                  </form>
                </Form>

                {/* <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" onClick={handleSubmit}>
                      Upload
                    </Button>
                  </SheetClose>
                </SheetFooter> */}
                <ToastContainer
                  position="top-right"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  className="custom-toast-container"
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* <div className="bg-gray-100 p-6 rounded-lg shadow-lg"> */}
          {items.length > 0 ? (
            <div className="container mx-auto   rounded-lg shadow-lg">
              <div className="flex justify-center items-center p-4">
                <p className=" font-bold text-center text-xl mr-2">
                  Release History
                </p>

                <img className="w-6 h-6" src="/public/history (1).png" />
              </div>
              <ReleaseTable releases={items} appId={appId} />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-screen py-16">
              <img className="w-60 h-50 " src="/empty-box.png" />
              <p className="text-2xl font-bold leading-8">
                You have no releases yet
              </p>
              <p>Start distributing your app among your teams and testers.</p>
            </div>
          )}

          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Releases;

// ------------------------------------------------------------------------------------------

// import React, { useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Sidebar from "@/components/Sidebar";

// import { columns } from "@/schemas/releaseColumns";
// import { ReleaseTable } from "@/components/ReleaseTable";

// function getData() {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "a1b2c3d4",
//       release: "1.0.0",
//       version: "1.0.0",
//       fileExtension: ".zip",
//     },
//     {
//       id: "e5f6g7h8",
//       release: "1.1.0",
//       version: "1.1.0",
//       fileExtension: ".tar.gz",
//     },
//     {
//       id: "i9j0k1l2",
//       release: "2.0.0",
//       version: "2.0.0",
//       fileExtension: ".exe",
//     },
//     {
//       id: "m3n4o5p6",
//       release: "2.1.0",
//       version: "2.1.0",
//       fileExtension: ".dmg",
//     },
//     {
//       id: "q7r8s9t0",
//       release: "3.0.0",
//       version: "3.0.0",
//       fileExtension: ".apk",
//     },
//     {
//       id: "u1v2w3x4",
//       release: "3.1.0",
//       version: "3.1.0",
//       fileExtension: ".iso",
//     },
//     {
//       id: "y5z6a7b8",
//       release: "4.0.0",
//       version: "4.0.0",
//       fileExtension: ".bin",
//     },
//     {
//       id: "c9d0e1f2",
//       release: "4.1.0",
//       version: "4.1.0",
//       fileExtension: ".pkg",
//     },
//     {
//       id: "g3h4i5j6",
//       release: "5.0.0",
//       version: "5.0.0",
//       fileExtension: ".deb",
//     },
//     {
//       id: "k7l8m9n0",
//       release: "5.1.0",
//       version: "5.1.0",
//       fileExtension: ".rpm",
//     },
//   ];
//   // ...
// }

// const Releases = () => {
//   const [fileName, setFileName] = useState("");
//   const [fileSize, setFileSize] = useState("");
//   const [error, setError] = useState("");
//   const fileInputRef = useRef(null);
//   const data = getData(); // for table
//   const handleFileChange = () => {
//     const file = fileInputRef.current.files[0];
//     const fileSize = (fileInputRef.current.files[0].size / 1024).toFixed(2);
//     console.log("file info", fileInputRef.current.files[0].size);
//     console.log("fr", fileInputRef);
//     if (file) {
//       const fileExtension = file.name.split(".").pop().toLowerCase();
//       if (fileExtension === "apk" || fileExtension === "aab") {
//         setFileName(file.name);
//         setFileSize(fileSize);
//         setError("");
//       } else {
//         setFileName("");
//         setError(
//           `.${fileExtension.toLowerCase()} is not supported for this OS`
//         );
//       }
//     }
//   };

//   const handleSubmit = () => {
//     setFileName("");
//     setError("");
//     fileInputRef.current.value = "";
//   };
//   return (
//     <>
//       <div className="flex h-screen">
//         <Sidebar />

//         {/* <div className="flex justify-between px-10 py-5 w-full "> */}
//         <div className="flex flex-col w-full p-10">
//           <div className="flex justify-between items-center mb-6">
//             <p className="text-3xl font-bold">Releases</p>

//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="text-white text-lg px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
//                 >
//                   New Release
//                 </Button>
//               </SheetTrigger>
//               <SheetContent>
//                 <SheetHeader>
//                   <SheetTitle>New Release</SheetTitle>

//                   <SheetTitle>Upload</SheetTitle>
//                 </SheetHeader>
//                 <hr className="my-2 border-t-2 border-gray-300" />
//                 <div className="grid gap-4 py-4 mt-5">
//                   <Label htmlFor="file-upload" className="text-md font-normal">
//                     Upload a Build
//                   </Label>
//                   <div className="flex items-center">
//                     {/* The <label> element in HTML is used to associate a label with a form element (like <input>, <textarea>, <select>, etc.). When you use the htmlFor attribute on the <label>, it links the label to a specific input element by matching the value of htmlFor with the id of the input element. */}
//                     <label
//                       htmlFor="file-upload"
//                       className="cursor-pointer flex items-center justify-start p-2 h-35 w-full bg-gray-200 border-2  border-gray-300 rounded-lg text-center text-gray-700 font-semibold hover:border-blue-500 hover:bg-blue-100 transition-all"
//                     >
//                       <input
//                         ref={fileInputRef}
//                         id="file-upload"
//                         type="file"
//                         className="hidden"
//                         required
//                         onChange={handleFileChange}
//                       />

//                       <div className="text-xl    text-left">
//                         <p>Release:</p>
//                         {fileName ? (
//                           <div className="h-30 w-full">
//                             <p>{fileName}</p>
//                             <p>Size of File: {fileSize} MB</p>
//                           </div>
//                         ) : error ? (
//                           <p className="text-red-500">{error}</p>
//                         ) : (
//                           <p>Upload (.apk or .aab file)</p>
//                         )}
//                       </div>
//                     </label>
//                   </div>
//                   <div className="space-y-4">
//                     {/* Version Input */}
//                     <input
//                       type="text"
//                       placeholder="Version"
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />

//                     {/* Description Textarea */}
//                     <textarea
//                       placeholder="Release Note..."
//                       required
//                       className="w-full h-36 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       rows="4"
//                     />
//                   </div>
//                 </div>
//                 <SheetFooter>
//                   <SheetClose asChild>
//                     <Button type="submit" onClick={handleSubmit}>
//                       Upload
//                     </Button>
//                   </SheetClose>
//                 </SheetFooter>
//               </SheetContent>
//             </Sheet>
//           </div>
//           {/* <div className="flex flex-col justify-center items-center h-screen py-16">
//             <img className="w-60 h-50 " src="/empty-box.png" />
//             <p className="text-2xl font-bold leading-8">
//               You have no releases yet
//             </p>
//             <p>Start distributing your app among your teams and testers.</p>
//           </div> */}

//           <div className="container mx-auto py-10">
//             <ReleaseTable columns={columns} data={data} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Releases;
