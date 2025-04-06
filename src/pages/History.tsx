import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import MonthSelector from '../components/history/MonthSelector';
import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';

const History =() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const transactions = useSelector((state: RootState) => state.transactions.items);
  
  // Filter transactions for selected month
  const selectedMonthTransactions = transactions.filter(transaction => {
    const transDate = new Date(transaction.date);
    return transDate.getMonth() === selectedDate.getMonth() &&
           transDate.getFullYear() === selectedDate.getFullYear();
  });

  const monthlyIncome = selectedMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = selectedMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = monthlyIncome - monthlyExpenses;

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
        {selectedMonthTransactions.length > 0 ? (
          <TransactionList
            transactions={selectedMonthTransactions}
            onEdit={(id) => console.log('Edit:', id)}
            onDelete={(id) => console.log('Delete:', id)}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No transactions found for this month
          </div>
        )}
      </div>
    </div>
  );
}
export default History;