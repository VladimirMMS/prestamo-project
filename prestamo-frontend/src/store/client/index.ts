/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { CounterState } from "./interfaces";


const initialState: any = {
  isUserLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
        Object.assign(state, {
          ...action.payload,
          isUserLogin: true,
        });

    },
    logout: (state) => {
      localStorage.clear();
      Object.assign(state, {
        ...initialState,
      });

    }
  },
});

export const { login,logout } = loginSlice.actions;
export default loginSlice.reducer;
