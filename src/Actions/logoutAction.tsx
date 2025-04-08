// authActions.ts
import { clearBudget } from '@/store/budgetSettingsSlice';
import { Logout } from '../store/authSlice';
import { clearCalculatedData } from '@/store/caculcatedDataSlice';
import { clearTransaction } from '@/store/transactionsSlice';
import { AppDispatch } from '@/store';
export const logoutUserAction = (dispatch: AppDispatch) => {
  // Clear local storage
  localStorage.removeItem('token');
  // Dispatch logout action
  dispatch(Logout());
  dispatch(clearBudget());
  dispatch(clearCalculatedData())
  dispatch(clearTransaction())
};