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
    addBudget: (state, action: PayloadAction<Partial<BudgetData>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { addBudget } = budgetSettingsSlice.actions;
export default budgetSettingsSlice.reducer;
