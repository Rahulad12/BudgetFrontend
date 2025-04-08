import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BudgetData,budgetResponseType } from '../types';

const initialState: BudgetData = {
  monthlyExpense: 0,
  expensesThreshold: 0,
  savingGoal: 0
};

const budgetSettingsSlice = createSlice({
  name: 'budgetSettings',
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<budgetResponseType>) => {
      state.monthlyExpense = action.payload[0].monthlyExpense;
      state.expensesThreshold = action.payload[0].expensesThreshold;
      state.savingGoal = action.payload[0].savingGoal;
    },
    clearBudget: () => {
      return initialState
    },
  },
});

export const { addBudget,clearBudget } = budgetSettingsSlice.actions;
export default budgetSettingsSlice.reducer;
