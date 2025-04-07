import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';
import { AlertTriangle } from 'lucide-react';
import { getMonthlyTransaction } from '../service/transaction';
import { useEffect } from 'react';
import { MonthlyTransaction } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { addMonthlyTransactions } from '../store/transactionsSlice';
import { getBudget } from '../service/budgetService';
import { addBudget } from '../store/budgetSettingsSlice';


const Dashboard = () => {
  const dispatch = useDispatch();

  const transactions: MonthlyTransaction = useSelector((state: any) => state.transactions.items[0]);
  console.log(transactions);
  const budgetState = useSelector((state: any) => state.budgetSettings);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [monthlyTransactions, budget] = await Promise.all([
          getMonthlyTransaction(),
          getBudget(),
        ]);
        dispatch(addMonthlyTransactions(monthlyTransactions.data));
        dispatch(addBudget(budget[0])); // First element
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchDashboardData();
  }, [dispatch]);

  const monthlyIncome = transactions?.monthlyIncome;
  const monthlyExpenses = transactions?.monthlyExpense;
  const balance = transactions?.monthlyBalance;
  const totalExpenseLeft = monthlyExpenses - budgetState?.monthlyExpenses;
  const expenseRatio = (monthlyExpenses / budgetState?.monthlyExpenses) * 100;
  const isOverBudget = expenseRatio > budgetState?.expensesThreshold;
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