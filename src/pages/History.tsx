import { useEffect, useState } from 'react';
import MonthSelector from '../components/history/MonthSelector';
import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';
import { getFilterdTransaction } from "../service/transaction";
import { MonthlyTransaction } from '../types';
import { addMonthlyTransactions } from '../store/transactionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import TransactionLoading from '../components/common/TransactionLoading';

const History = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const transactions: MonthlyTransaction[] = useSelector((state: any) => state.transactions.items);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const historyTransactions = await getFilterdTransaction(
          selectedDate.toLocaleString('default', { month: 'long' })
        );

        if (historyTransactions?.success) {
          dispatch(addMonthlyTransactions(historyTransactions.data));
        } else {
          throw new Error(historyTransactions?.message || 'Failed to fetch transactions');
        }
      } catch (error: any) {
        console.error('Error fetching history transactions:', error);
        setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryTransactions();
  }, [selectedDate, dispatch]);

  const monthlyIncome = transactions[0]?.monthlyIncome || 0;
  const monthlyExpenses = transactions[0]?.monthlyExpense || 0;
  const savings = transactions[0]?.monthlyBalance || 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        </div>
        <MonthSelector currentDate={selectedDate} onMonthChange={setSelectedDate} />
        <TransactionLoading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
      </div>

      <MonthSelector currentDate={selectedDate} onMonthChange={setSelectedDate} />

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BudgetCard title="Total Income" amount={monthlyIncome} type="income" />
            <BudgetCard title="Total Expenses" amount={monthlyExpenses} type="expense" />
            <BudgetCard title="Savings" amount={savings} type="balance" />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Transactions</h2>
            {transactions[0]?.transaction?.length ? (
              <TransactionList />
            ) : (
              <p className="text-gray-500 text-center py-4">No transactions found for this month</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default History;