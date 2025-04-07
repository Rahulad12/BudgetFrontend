import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MonthlyTransaction} from '../types';

interface TransactionsState {
  items: MonthlyTransaction[];
}

const initialState: TransactionsState = {
  items: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addMonthlyTransactions: (state, action: PayloadAction<MonthlyTransaction[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addMonthlyTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;