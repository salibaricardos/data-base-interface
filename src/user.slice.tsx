import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id?: string;
  name: string | undefined;
  lastName: string | undefined;
  age: number | undefined;
  phoneNumber: number | undefined;
  email: string | undefined;
}

export interface Current {
  current: User;
}

const init: Current = {
  current: {
    _id: undefined,
    name: undefined,
    lastName: undefined,
    age: undefined,
    phoneNumber: undefined,
    email: undefined,
  },
};
const userSlice = createSlice({
  name: "User",
  initialState: init,

  reducers: {
    setCurrent: (state, { payload }) => {
      state.current = payload;
    },
  },
});
export const userReducer = userSlice.reducer;

export const userActions = {
  ...userSlice.actions,
};
