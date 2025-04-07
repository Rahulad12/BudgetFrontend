import { useEffect, useMemo, useState } from 'react';
import MonthSelector from '../components/history/MonthSelector';
import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import TransactionLoading from '../components/common/TransactionLoading';
import { transactionFetch } from '../Fetch/transactionFetch';
import calculateData from '../utils/calculateData';

const History = () => {
  const dispatch = useAppDispatch();
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(() => {
    dispatch(transactionFetch(selectedDate));
  }, [selectedDate, dispatch]);

  const { items: transactions, loading, error } = useAppSelector((state) => state.transactions);
  const budgetState = useAppSelector((state) => state.budgetSettings);

  const calculatedData = useMemo(() => {
    return calculateData(transactions[0] || {}, budgetState || {});
  }, [transactions, budgetState]);

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
            <BudgetCard
              title="Monthly Income"
              amount={calculatedData?.monthlyIncome}
              type="income"
            />
            <BudgetCard
              title="Monthly Expenses"
              amount={calculatedData?.monthlyExpenses}
              type="expense"
              percentage={calculatedData?.expenseRatio}
              totalExpenseLeft={calculatedData?.totalExpenseLeft}
              alert={calculatedData?.isOverBudget}
            />
            <BudgetCard
              title="Remaining Balance"
              amount={calculatedData?.balance}
              type="balance"
              alert={calculatedData?.isSavingGoalExceed}
              savingGoal={budgetState?.savingGoal}
            />
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