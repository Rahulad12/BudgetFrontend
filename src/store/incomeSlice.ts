import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { incomeResponseType } from "../types";

const initialState: incomeResponseType = {
    success: false,
    totalIncome: 0
};

const incomeSlice = createSlice({
    name: "income",
    initialState,
    reducers: {
        addIncome: (state, action: PayloadAction<incomeResponseType>) => {
            state.success = action.payload.success;
            state.totalIncome = action.payload.totalIncome;
        },
    },
});

export const { addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;