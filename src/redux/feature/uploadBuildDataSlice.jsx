import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const postUploadBuildData = createAsyncThunk(
  "postUploadBuildData",
  async (buildData) => {
    try {
      console.log("buildData", buildData);
      const accessToken = Cookies.get("accessToken");

      console.log("at", accessToken);
      if (!accessToken) {
        console.error("No JWT token found.User is not authenticated");
        throw new Error("No token found");
      }
      // console.log("bdata", JSON.stringify(buildData));

      const formData = new FormData();
      formData.append("file", buildData);
      console.log("formData", formData);
      const response = await fetch(
        "http://localhost:8000/api/file/uploadFile",
        {
          method: "POST",
          headers: {
            // "Content-type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: formData,
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

const uploadBuildDataSlice = createSlice({
  name: "uploadBuildData",
  initialState: {
    isLoading: false,
    buildUrlData: "",
    isError: false,
  },
  reducers: {
    clearBuildUrlData: (state) => {
      state.buildUrlData = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postUploadBuildData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postUploadBuildData.fulfilled, (state, action) => {
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.buildUrlData = action.payload;
      state.isError = false;
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(postUploadBuildData.rejected, (state) => {
      state.isError = true;
    });
  },
});
export const { clearBuildUrlData } = uploadBuildDataSlice.actions;
export default uploadBuildDataSlice.reducer;
