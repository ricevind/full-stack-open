import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    good: (state) => {
      state.good += 1;
      return state;
    },
    ok: (state) => {
      state.ok += 1;
      return state;
    },
    bad: (state) => {
      state.bad += 1;
      return state;
    },
    reset: () => initialState,
  },
});
