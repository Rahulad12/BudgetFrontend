import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from '../types';

interface TransactionsState {
  items: Transaction[];
}

const initialState: TransactionsState = {
  items: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransactions, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;