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




let a = 0

function lol() {
  setInterval(() => {
    a++
  console.log('лол че происходит', a)
  }, 1000);
}


export const slicer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateStateUser: (state, action) => {
      lol()
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
  },
});

export const { updateStateUser, increment, decrement, incrementByAmount } =
  slicer.actions;
export default slicer.reducer;
