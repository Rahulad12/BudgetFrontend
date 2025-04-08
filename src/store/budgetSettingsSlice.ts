import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BudgetData } from '../types';

const initialState: BudgetData = {
  monthlyExpense: 0,
  expensesThreshold: 0,
  savingGoal: 0
};

const budgetSettingsSlice = createSlice({
  name: 'budgetSettings',
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<BudgetData>) => {
      state.monthlyExpense = action.payload.monthlyExpense
      state.expensesThreshold = action.payload.expensesThreshold;
      state.savingGoal = action.payload.savingGoal;
    },
  },
});

export const { addBudget } = budgetSettingsSlice.actions;
export default budgetSettingsSlice.reducer;
