import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import signupSchema from "@/schemas/signupSchema";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "@/redux/feature/authDataSlice";
import { postRegisterData } from "@/redux/feature/authRegisterSlice";
import { ToastContainer, toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const notifySuccess = () => {
    toast.success("Register successfully"),
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
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      // lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // watch is a function that listens for changes in the form fields.
  const { watch } = form;
  // console.log("f", form);//fives a form object
  // Watch the entire form data
  const data = watch();
  useEffect(() => {
    // This will be triggered whenever formData changes
    // console.log("Form data changed:", formData);
  }, [data]);

  const onSubmit = (formData) => {
    console.log(formData);
    const { firstName, email, password } = formData;
    console.log({ firstName, email, password });
    dispatch(
      register({
        firstName: formData.firstName,
        // lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
    );

    dispatch(postRegisterData({ name: firstName, email, password })).then(
      (response) => {
        if (!response.payload.success) {
          notifyFailure(response.payload.message);
        } else {
          notifySuccess();
          setTimeout(() => {
            navigate("/authLogin");
          }, 3000);
        }
      }
    );
  };
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Create Free Account
          </h2>

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500 text-lg">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500 text-lg">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
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
                      type={passwordVisibility.password ? "text" : "password"}
                    />
                    <img
                      src={
                        passwordVisibility.password ? "/hidden.png" : "/eye.png"
                      }
                      onClick={() => togglePasswordVisibility("password")}
                      className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      alt="toggle password visibility"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-500 text-lg">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      type={
                        passwordVisibility.confirmPassword ? "text" : "password"
                      }
                    />
                    <img
                      src={
                        passwordVisibility.confirmPassword
                          ? "/hidden.png"
                          : "/eye.png"
                      }
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
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
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Link
              to="/authLogin"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Sign In
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Register
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

export default SignupPage;
