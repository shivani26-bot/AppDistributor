import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const postReleaseData = createAsyncThunk(
  "postReleaseData",
  async (releaseData) => {
    try {
      console.log("releaseData", releaseData);
      const { build, version, releaseNote, appId, fileSize, fileExtension } =
        releaseData;
      console.log("fileSize", fileSize);
      console.log("appId", appId);
      const accessToken = Cookies.get("accessToken");

      console.log("at", accessToken);
      if (!accessToken) {
        console.error("No JWT token found.User is not authenticated");
        throw new Error("No token found");
      }

      const response = await fetch(
        `http://localhost:8000/api/release/registerRelease/${appId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            build,
            version,
            releaseNote,
            applicationId: appId,
            fileSize,
            fileExtension,
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

const releaseDataSlice = createSlice({
  name: "releaseData",
  initialState: {
    isLoading: false,
    buildData: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(postReleaseData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postReleaseData.fulfilled, (state, action) => {
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.buildData = action.payload;
      state.isError = false;
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(postReleaseData.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default releaseDataSlice.reducer;
