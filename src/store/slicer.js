import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 714289599,
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
  name: "user",
  initialState,
  reducers: {
    updateStateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    decrementByAmount: (state,action) => {
      state.balance -= action.payload;

    },
    incrementByAmount: (state, action) => {
      state.balance += action.payload;
    },
    staticAdd: (state) => {
      state.balance = state.balance + 1;
    },
  },
});

export const {
  updateStateUser,
  decrementByAmount,
  incrementByAmount,
  staticAdd,
} = slicer.actions;
export default slicer.reducer;
