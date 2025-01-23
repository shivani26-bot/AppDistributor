import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "@/schemas/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/feature/authDataSlice";
import { ToastContainer, toast } from "react-toastify";
import { postLoginData } from "@/redux/feature/authLoginSlice";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authLogin);
  console.log(userData);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const notifySuccess = () => {
    toast.success("Logged In successfully"),
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

  const { watch } = form;
  // console.log("f", form);//fives a form object
  // Watch the entire form data
  const dataChange = watch();
  useEffect(() => {
    if (userData && userData.data) {
      // localStorage.setItem("userData", JSON.stringify(userData));
      // localStorage.setItem("token", userData.data);
      // sessionStorage.setItem("token", userData.data);
      // Cookies.set("token", userData.data);
      Cookies.set("accessToken", userData.data);
      // Cookies.set("token", userData.data, {
      //   expires: 7, // Expiry time
      //   path: "/", // Cookie should be available throughout the domain
      //   secure: process.env.NODE_ENV === "production", // Secure flag for HTTPS in production
      //   httpOnly: false, // If you want the cookie to be accessible via JavaScript
      // });
    }
    // This will be triggered whenever formData changes
    // console.log("Form data changed:", formData);
  }, [userData, dataChange]);

  const onSubmit = (formData) => {
    const { email, password } = formData;
    console.log({ email, password });
    dispatch(
      login({
        email: formData.email,
        password: formData.password,
      })
    );

    dispatch(postLoginData({ email, password })).then((response) => {
      if (!response.payload.success) {
        notifyFailure(response.payload.message);
      } else {
        notifySuccess();
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign In
          </h2>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500 text-lg">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500 text-lg">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Password"
                      {...field}
                      type={passwordVisibility ? "text" : "password"}
                    />
                    <img
                      src={passwordVisibility ? "/hidden.png" : "/eye.png"}
                      onClick={togglePasswordVisibility}
                      className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      alt="toggle password visibility"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-left">
            <p className="text-sm text-gray-600">New Here?</p>
            <Link
              to="/authSignup"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Create a new account
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
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
  );
};

export default LoginPage;
