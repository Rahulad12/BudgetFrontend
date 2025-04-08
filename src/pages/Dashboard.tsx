import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux"; // Create custom typed hooks
import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';
import { AlertTriangle } from 'lucide-react';
import TransactionLoading from '../components/common/TransactionLoading';
import { transactionFetch } from '../Actions/transactionFetch';
import calculateData from '../utils/calculateData';
import { calculateDataState } from "../store/caculcatedDataSlice"
import { getBudgetFetch } from "../Actions/budgetFetch";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const currentDate = useMemo(() => {
    return new Date();
  }, []);

  // dispatch the calculated data
  useEffect(() => {
    dispatch(transactionFetch(currentDate));
    dispatch(calculateDataState(calculatedData));
    getBudgetFetch(dispatch);
  }, [dispatch, currentDate]);

  const { items: transactions, loading, error } = useAppSelector((state) => state.transactions);
  const budgetState = useAppSelector((state) => state.budgetSettings);

  const calculatedData = useMemo(() => {
    return calculateData(transactions[0] || {}, budgetState || {});
  }, [transactions, budgetState]);


  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <TransactionLoading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {calculatedData?.isOverBudget && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertTriangle size={20} />
            <span>Expenses exceed your budget!</span>
          </div>
        )}
      </div>

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
        <BudgetCard
          title="Set Budget"
          amount={budgetState?.monthlyExpense}
          type="budget"
          alert={calculatedData?.isOverBudget}
        />
        <BudgetCard
          title="Set Saving Goal"
          amount={budgetState?.savingGoal}
          type="saving"
          alert={calculatedData?.isSavingGoalExceed}
        />
      </div>

      {error ? (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center gap-2">
          <AlertTriangle size={20} />
          <span>{error}</span>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <TransactionList />
        </div>
      )}
    </div>
  );
};

export default Dashboard;