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
        clearCalculatedData: (state) => {
            state.monthlyIncome = 0;
            state.monthlyExpenses = 0;
            state.balance = 0;
            state.totalExpenseLeft = 0;
            state.expenseRatio = 0;
            state.isSavingGoalExceed = false;
            state.isOverBudget = false;
        }
    },
});

export const { calculateDataState,clearCalculatedData } = calculatedDataSlice.actions;
export default calculatedDataSlice.reducer;