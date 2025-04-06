import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import budgetSettingsReducer from './budgetSettingsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgetSettings: budgetSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;