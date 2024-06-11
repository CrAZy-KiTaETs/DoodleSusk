import { createSlice } from "@reduxjs/toolkit";

const user = {
    id: "",
    username: "",
    ref: "",
    wallet: "",
    balance: "",
    invited: "",
    is_sub: "",
    ref_count: "",
    twitter: "",
    inf: "",
    inf_sub: "",
    inf_link: "",
}


export const slicer = createSlice({
    name: "counter",
    initialState: {
        counter: 0
    },
    reducers: {
        increment: (state) => {
            state.counter = state.counter + 1

        },
        decrement: (state) => {
            state.counter -= 1
        },
        incrementByAmount: (state, action) => {
            state.counter += action.payload
        }
    }
})

export const {increment, decrement, incrementByAmount} = slicer.actions
export default slicer.reducer