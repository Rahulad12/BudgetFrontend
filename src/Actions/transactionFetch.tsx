// Fetch/transactionFetch.ts
import { getFilterdTransaction } from "../service/transactionService";
import { AppDispatch } from "../store"; // You'll need to export this from your store
import { addMonthlyTransactions, addMonthlyTransactionsError, setTransactionsLoading } from "../store/transactionsSlice";

export const transactionFetch = (currentDate: Date) => async (dispatch: AppDispatch) => {
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    dispatch(setTransactionsLoading());
    try {
        const response = await getFilterdTransaction(currentMonth);
        dispatch(addMonthlyTransactions(response.data));
    } catch (error: any) {
        // Use user-friendly messages
        const errorMessage = error.message.includes('Network')
            ? "Network error: Please check your internet connection"
            : error.message;

        dispatch(addMonthlyTransactionsError(errorMessage));

        // Optionally log the full error for debugging
        console.error('Transaction fetch error:', error);
    }
};