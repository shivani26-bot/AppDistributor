import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { deleteRelease } from "@/redux/feature/deleteReleaseDataSlice";
import { ToastContainer, toast } from "react-toastify";

import Cookies from "js-cookie";
import { fetchReleaseData } from "@/redux/feature/getReleaseDataSlice";
const DeleteModal = ({ onClose, releaseId, appId }) => {
  console.log("rid2", releaseId);
  // const notifySuccess = () => {
  //   toast.success("Deleted successfully"),
  //     {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       className: "custom-toast-container",
  //     };
  // };

  // const notifyFailure = () =>
  //   toast.error("Error", {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //     className: "custom-toast-container",
  //   });

  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");
  const triggerFetchData = () => {
    if (accessToken) {
      dispatch(fetchReleaseData({ accessToken, appId }));
    }
  };
  const handleDelete = () => {
    dispatch(deleteRelease({ accessToken, releaseId }))
      .then((response) => {
        if (response.payload.success) {
          // notifySuccess();
          triggerFetchData();

          // Close the modal immediately
          onClose();
        } else {
          // notifyFailure();
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      })
      .catch(() => {
        // notifyFailure();
        setTimeout(() => {
          onClose();
        }, 1000);
      });
  };
  return (
    <AlertDialog open={true}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            release and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
        {/* <ToastContainer
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
          /> */}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
