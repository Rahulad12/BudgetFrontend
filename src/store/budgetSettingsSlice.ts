import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BudgetSettings } from '../types';

const initialState: BudgetSettings = {
  monthlyIncome: 0,
  monthlyBudget: 0,
  warningThreshold: 80, // Default warning at 80% of budget
};

const budgetSettingsSlice = createSlice({
  name: 'budgetSettings',
  initialState,
  reducers: {
    updateBudgetSettings: (state, action: PayloadAction<Partial<BudgetSettings>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateBudgetSettings } = budgetSettingsSlice.actions;
export default budgetSettingsSlice.reducer;