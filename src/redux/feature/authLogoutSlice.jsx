import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const postLogoutData = createAsyncThunk("postLogoutData", async () => {
  // console.log("logging out");
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("ud", userData);
  // // const accessToken = userData ? userData.data : null;
  // const accessToken = userData.data;

  // const accessToken = localStorage.getItem("token");
  // const accessToken = sessionStorage.getItem("token");
  const accessToken = Cookies.get("accessToken");

  console.log("at", accessToken);
  if (!accessToken) {
    console.error("No JWT token found.User is not authenticated");
    throw new Error("No token found");
  }
  try {
    const response = await fetch("http://localhost:8000/api/user/logout", {
      // const response = await fetch(
      //   " https://d158-2406-7400-10a-177b-b9db-1035-919c-c942.ngrok-free.app/api/user/logout",
      //   {
      method: "POST",
      headers: {
        "Content-type": "application/json", // backend isn't necessarily expecting a request body for logout,it tells the backend that the request is in JSON format
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include", //This ensures that cookies (like session cookies or a refresh token stored in cookies) are sent with the request. This is important if the backend uses cookies to manage authentication
      // body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    console.log("rd", responseData);
    return responseData;
  } catch (error) {
    console.log("Error in login user data", error);
    throw error;
  }
});

const authLogoutSlice = createSlice({
  name: "authLogout",
  initialState: {
    isLoading: false,
    userData: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(postLogoutData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postLogoutData.fulfilled, (state, action) => {
      console.log("action3", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.userData = action.payload;
      state.isError = false;
      console.log("action4", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(postLogoutData.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default authLogoutSlice.reducer;
