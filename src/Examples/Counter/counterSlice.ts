import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../Redux/rootReducer";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

const selectCounter = (state: RootState) => state.counter.value;
export { selectCounter };

export default counterSlice.reducer;
