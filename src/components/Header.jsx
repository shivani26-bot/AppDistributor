import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogoutData } from "@/redux/feature/authLogoutSlice";
import { logout } from "@/redux/feature/authLoginSlice";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const Header = () => {
  // const { userData } = useSelector((state) => state.authLogin);
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const token = localStorage.getItem("token");
  // const token = sessionStorage.getItem("token");
  // const token = Cookies.get("token");
  const token = Cookies.get("accessToken");
  console.log("tok", token);
  // const accessToken = userData ? userData.data : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifySuccess = () => {
    toast.success("Logged Out successfully"),
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

  const notifyFailure = () =>
    toast.error("Error in Logging Out! ", {
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
  // useEffect(() => {
  //   if (userData && userData.data) {
  //     localStorage.setItem("userData", JSON.stringify(userData));
  //   }
  //   // This will be triggered whenever formData changes
  //   // console.log("Form data changed:", formData);
  // }, [userData, dataChange]);

  const handleLogout = () => {
    dispatch(postLogoutData())
      .then((response) => {
        if (!response.payload.success) {
          notifyFailure();
        } else {
          // localStorage.removeItem("userData");
          // localStorage.removeItem("token");
          // sessionStorage.removeItem("token");
          Cookies.remove("accessToken");
          dispatch(logout());
          notifySuccess();
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        notifyFailure(); // Notify the user about the logout error
      });
  };

  return (
    <>
      {!token ? (
        <div className="bg-gray-300">
          <div className="py-4 flex justify-between items-center px-4">
            <div>
              <div className="flex  items-center mb-2">
                <img
                  className="w-10 mr-2"
                  src="/microsoft.png"
                  alt="Microsoft"
                />
                <p className="mr-2  text-3xl ">Microsoft</p>
              </div>
              <p className="text-3xl">
                Visual Studio{" "}
                <span className="text-3xl font-bold"> App Center</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-300">
          <div className="py-4 flex justify-between items-center px-4">
            <div>
              <div className="flex  items-center mb-2">
                <img
                  className="w-10 mr-2"
                  src="/microsoft.png"
                  alt="Microsoft"
                />
                <p className="mr-2  text-3xl ">Microsoft</p>
              </div>
              <p className="text-3xl ">
                Visual Studio{" "}
                <span className="text-3xl font-bold"> App Center</span>
              </p>
            </div>
            <DropdownMenu className=" mr-10">
              {/* <DropdownMenuTrigger asChild> */}
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                {/* <Button variant="outline">Open</Button> */}
                <Avatar>
                  <AvatarImage
                    src="/avatarimage.jpg"
                    alt="@shadcn"
                    className="object-contain"
                  ></AvatarImage>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Keyboard shortcuts
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Invite users
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    New Team
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup> */}
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="justify-between"
                >
                  Log out
                  {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                  <img src="/logout.png" alt="logout" className="w-5 h-5 " />
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-between">
                  Help
                  {/* <DropdownMenuShortcut>?</DropdownMenuShortcut> */}
                  <img src="/help.png" alt="shortcut" className="w-5 h-5 " />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
        </div>
      )}
    </>
  );
};

export default Header;
