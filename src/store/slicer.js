import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  ref: "",
  wallet: "",
  balance: 0,
  invited: "",
  is_sub: "",
  ref_count: 0,
  twitter: "",
  inf: "",
  inf_sub: "",
  inf_link: "",
};

export const slicer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateStateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    increment: (state) => {
      state.balance = state.balance + 1;
    },
    decrement: (state) => {
      state.balance -= 1;
    },
    incrementByAmount: (state, action) => {
      state.balance += action.payload;
    },
    staticAdd: (state) => {
      state.balance++;
    },
  },
});

export const {
  updateStateUser,
  increment,
  decrement,
  incrementByAmount,
  staticAdd,
} = slicer.actions;
export default slicer.reducer;
