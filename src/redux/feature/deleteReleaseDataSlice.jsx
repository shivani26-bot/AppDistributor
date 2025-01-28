import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const deleteRelease = createAsyncThunk(
  "deleteReleaseData",
  async ({ accessToken, releaseId }) => {
    console.log(accessToken);
    console.log("rid3", releaseId);
    try {
      //   console.log("releaseData", releaseData);

      //   console.log("appId", appId);
      //   const accessToken = Cookies.get("accessToken");

      //   console.log("at", accessToken);
      //   if (!accessToken) {
      //     console.error("No JWT token found.User is not authenticated");
      //     throw new Error("No token found");
      //   }

      const response = await fetch(
        `http://localhost:8000/api/release/deleteRelease`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            _id: releaseId,
          }),
        }
      );
      const responseData = await response.json();
      console.log("rd", responseData);
      return responseData;
    } catch (error) {
      console.log("Error in login user data", error);
      throw error;
    }
  }
);

const deleteReleaseDataSlice = createSlice({
  name: "deleteReleaseData",
  initialState: {
    isLoading: false,
    data: null,

    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(deleteRelease.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteRelease.fulfilled, (state, action) => {
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(deleteRelease.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default deleteReleaseDataSlice.reducer;
