import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { calculateDataType } from "../types";

const initialState: calculateDataType = {
    monthlyIncome: 0,
    monthlyExpenses: 0,
    balance: 0,
    totalExpenseLeft: 0,
    expenseRatio: 0,
    isSavingGoalExceed: false,
    isOverBudget: false,
};

const calculatedDataSlice = createSlice({
    name: "calculatedData",
    initialState,
    reducers: {
        calculateDataState: (state, action: PayloadAction<calculateDataType>) => {
            const {
                monthlyIncome,
                monthlyExpenses,
                balance,
                totalExpenseLeft,
                expenseRatio,
                isSavingGoalExceed,
                isOverBudget,
            } = action.payload;
            state.monthlyIncome = monthlyIncome;
            state.monthlyExpenses = monthlyExpenses;
            state.balance = balance;
            state.totalExpenseLeft = totalExpenseLeft;
            state.expenseRatio = expenseRatio;
            state.isSavingGoalExceed = isSavingGoalExceed;
            state.isOverBudget = isOverBudget;  
        },
    },
});

export const { calculateDataState } = calculatedDataSlice.actions;
export default calculatedDataSlice.reducer;