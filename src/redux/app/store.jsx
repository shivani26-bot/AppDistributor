import { configureStore } from "@reduxjs/toolkit";
import authDataSlice from "../feature/authDataSlice";
import authLoginSlice from "../feature/authLoginSlice";
import authRegisterSlice from "../feature/authRegisterSlice";
import authLogoutSlice from "../feature/authLogoutSlice";

export const reduxStore = configureStore({
  reducer: {
    authData: authDataSlice,
    authLogin: authLoginSlice,
    authRegister: authRegisterSlice,
    authLogout: authLogoutSlice,
  },
});

export default reduxStore;
