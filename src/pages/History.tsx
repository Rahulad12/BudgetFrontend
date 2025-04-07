import { useEffect, useState } from 'react';
import MonthSelector from '../components/history/MonthSelector';
import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';
import { getFilterdTransaction } from "../service/transaction"
import { MonthlyTransaction } from '../types';
import { addMonthlyTransactions } from '../store/transactionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const History = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const transactions: MonthlyTransaction[] = useSelector((state: any) => state.transactions.items);

  console.log(transactions);
  useEffect(() => {
    const fetchHistoryTransactions = async () => {
      try {
        const historyTransactions = await getFilterdTransaction(selectedDate.toLocaleString('default', { month: 'long' }));
        if (historyTransactions?.success) {
        } dispatch(addMonthlyTransactions(historyTransactions.data));

      } catch (error) {
        console.error('Error fetching history transactions:', error);
      }
    };

    fetchHistoryTransactions();
  }, [selectedDate]);


  const monthlyIncome = transactions[0]?.monthlyIncome;
  const monthlyExpenses = transactions[0]?.monthlyExpense;
  const savings = transactions[0]?.monthlyBalance;


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
      </div>

      <MonthSelector
        currentDate={selectedDate}
        onMonthChange={setSelectedDate}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BudgetCard
          title="Total Income"
          amount={monthlyIncome}
          type="income"
        />
        <BudgetCard
          title="Total Expenses"
          amount={monthlyExpenses}
          type="expense"
        />
        <BudgetCard
          title="Savings"
          amount={savings}
          type="balance"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Transactions
        </h2>
        <TransactionList />
      </div>
    </div>
  );
}
export default History;