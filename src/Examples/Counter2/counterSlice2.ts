import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../Redux/rootReducer";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice2 = createSlice({
  name: "counter2",
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

export const { increment, decrement } = counterSlice2.actions;

const selectCounter = (state: RootState) => state.counter2.value;
export { selectCounter };

export default counterSlice2.reducer;
