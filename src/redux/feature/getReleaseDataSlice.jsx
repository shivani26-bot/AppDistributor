import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchReleaseData = createAsyncThunk(
  "fetchReleaseData",
  async ({ accessToken, appId }) => {
    try {
      console.log(accessToken, appId);
      //   console.log("releaseData", releaseData);

      //   console.log("appId", appId);
      //   const accessToken = Cookies.get("accessToken");

      //   console.log("at", accessToken);
      //   if (!accessToken) {
      //     console.error("No JWT token found.User is not authenticated");
      //     throw new Error("No token found");
      //   }

      const response = await fetch(
        `http://localhost:8000/api/release/getRelease/${appId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
          //   body: JSON.stringify({
          //     build,
          //     version,
          //     releaseNote,
          //     applicationId: appId,
          //   }),
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

const getReleaseDataSlice = createSlice({
  name: "getReleaseData",
  initialState: {
    isLoading: false,
    data: null,
    items: [],
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchReleaseData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReleaseData.fulfilled, (state, action) => {
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.items = action.payload.data;
      state.data = action.payload;
      state.isError = false;
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(fetchReleaseData.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default getReleaseDataSlice.reducer;
