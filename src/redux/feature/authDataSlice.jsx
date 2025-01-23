import { createSlice } from "@reduxjs/toolkit";

export const authDataSlice = createSlice({
  name: "authData",
  initialState: {
    signUp: {
      firstName: "",
      // lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    signIn: {
      email: "",
      password: "",
    },
  },
  reducers: {
    register: (state, action) => {
      console.log("action1", action);
      state.signUp.firstName = action.payload.firstName;
      // state.signUp.lastName = action.payload.lastName;
      state.signUp.email = action.payload.email;
      state.signUp.password = action.payload.password;
      // state.signUp.confirmPassword = action.payload.confirmPassword;
    },
    login: (state, action) => {
      console.log("action2", action);
      state.signIn.email = action.payload.email;
      state.signIn.password = action.payload.password;
    },
  },
});

export const { register, login } = authDataSlice.actions;
export default authDataSlice.reducer;
