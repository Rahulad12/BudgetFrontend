import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';
import { AlertTriangle } from 'lucide-react';
import { getFilterdTransaction } from '../service/transaction';
import { useEffect, useState } from 'react';
import { MonthlyTransaction } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { addMonthlyTransactions } from '../store/transactionsSlice';
import { getBudget } from '../service/budgetService';
import { addBudget } from '../store/budgetSettingsSlice';
import TransactionLoading from '../components/common/TransactionLoading';

const Dashboard = () => {
  const dispatch = useDispatch();

  const transactions: MonthlyTransaction = useSelector((state: any) => state.transactions.items[0]);
  const budgetState = useSelector((state: any) => state.budgetSettings);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const date = new Date();
  const currentMonth = date.toLocaleString('default', { month: 'long' });

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)
      try {
        const [monthlyTransactions, budget] = await Promise.all([
          getFilterdTransaction(currentMonth),
          getBudget(),
        ]);
        dispatch(addMonthlyTransactions(monthlyTransactions.data));
        dispatch(addBudget(budget[0]));
        setLoading(false)
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message || 'An unexpected error occurred');
        setLoading(false)
      }
    }

    fetchDashboardData();
  }, [dispatch]);
  const monthlyIncome = transactions?.monthlyIncome;
  const monthlyExpenses = transactions?.monthlyExpense;
  const balance = transactions?.monthlyBalance;
  const totalExpenseLeft = budgetState?.monthlyExpense - monthlyExpenses;
  const expenseRatio = (monthlyExpenses / budgetState?.monthlyExpense) * 100;
  const isSavingGoalExceed = balance <= budgetState?.savingGoal;
  return (
    <>
      {
        loading && (
          <div className='space-y-6'>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <TransactionLoading />
          </div>
        )
      }
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BudgetCard title="Monthly Income" amount={monthlyIncome} type="income" />
          <BudgetCard
            title="Monthly Expenses"
            amount={monthlyExpenses}
            type="expense"
            percentage={expenseRatio}
            totalExpenseLeft={totalExpenseLeft}
            alert={expenseRatio > budgetState?.expensesThreshold}
          />
          <BudgetCard title="Remaining Balance" amount={balance} type="balance" alert={isSavingGoalExceed} savingGoal={budgetState?.savingGoal} />
        </div>
        {
          error ? (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center gap-2">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          ) :
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
              </div>
              <TransactionList />
            </div>
        }

      </div>
    </>
  );
};
export default Dashboard;