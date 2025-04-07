import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import budgetSettingsReducer from './budgetSettingsSlice';
import authReducer from './authSlice';
import incomeReducer from './incomeSlice';
import calculatedDataReducer from './caculcatedDataSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgetSettings: budgetSettingsReducer,
    auth: authReducer,
    income: incomeReducer,
    calculatedData: calculatedDataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

