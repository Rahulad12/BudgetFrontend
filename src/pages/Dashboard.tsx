import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';
import { AlertTriangle } from 'lucide-react';
import { getTransaction } from '../service/transaction';
import { useEffect } from 'react';
import { Transaction, incomeResponseType, BudgetData, budgetResponseType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactions } from '../store/transactionsSlice';
import { addIncome } from '../store/incomeSlice';
import { getIncome } from '../service/incomeService';
import { getBudget } from '../service/budgetService';
import { addBudget } from '../store/budgetSettingsSlice';


const Dashboard = () => {
  const dispatch = useDispatch();

  const transactions: Transaction[] = useSelector((state: any) => state.transactions.items);
  const income: incomeResponseType = useSelector((state: any) => state.income);
  const budgetState = useSelector((state: any) => state.budgetSettings);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [transactions, income, budget] = await Promise.all([
          getTransaction(),
          getIncome(),
          getBudget(),
        ]);

        dispatch(addTransactions(transactions));
        dispatch(addIncome(income));
        dispatch(addBudget(budget[0])); // First element
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchDashboardData();
  }, [dispatch]);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyIncome = income?.totalIncome || 0;
  const budgetThisMonth = budgetState?.monthlyExpense || 0;
  const balance = monthlyIncome - monthlyExpenses;
  const expenseRatio = monthlyIncome ? (monthlyExpenses / monthlyIncome) * 100 : 0;
  const isOverBudget = monthlyExpenses > budgetThisMonth;
  const totalExpenseLeft = budgetThisMonth - monthlyExpenses;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {isOverBudget && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertTriangle size={20} />
            <span>Expenses exceed your set monthly budget!</span>
          </div>
        )}
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
        <BudgetCard title="Monthly Balance" amount={balance} type="balance" />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <TransactionList />
      </div>
    </div>
  );
};
export default Dashboard;