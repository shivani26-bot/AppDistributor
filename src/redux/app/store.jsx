import { configureStore } from "@reduxjs/toolkit";
import authDataSlice from "../feature/authDataSlice";
import authLoginSlice from "../feature/authLoginSlice";
import authRegisterSlice from "../feature/authRegisterSlice";
import authLogoutSlice from "../feature/authLogoutSlice";

import uploadBuildDataSlice from "../feature/uploadBuildDataSlice";
import releaseDataSlice from "../feature/releaseDataSlice";
import getReleaseDataSlice from "../feature/getReleaseDataSlice";
import deleteReleaseDataSlice from "../feature/deleteReleaseDataSlice";

export const reduxStore = configureStore({
  reducer: {
    authData: authDataSlice,
    authLogin: authLoginSlice,
    authRegister: authRegisterSlice,
    authLogout: authLogoutSlice,
    uploadBuildData: uploadBuildDataSlice,
    releaseData: releaseDataSlice,
    getReleaseData: getReleaseDataSlice,
    deleteReleaseData: deleteReleaseDataSlice,
  },
});

export default reduxStore;
