import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MonthlyTransaction } from '../types';

interface TransactionsState {
  loading: boolean;
  error: string | null;
  items: MonthlyTransaction[];
}

const initialState: TransactionsState = {
  loading: false,
  error: null,
  items: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addMonthlyTransactions: (state, action: PayloadAction<MonthlyTransaction[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    addMonthlyTransactionsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTransactionsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

  },
});

export const { addMonthlyTransactions, addMonthlyTransactionsError, setTransactionsLoading } = transactionsSlice.actions;
export default transactionsSlice.reducer;