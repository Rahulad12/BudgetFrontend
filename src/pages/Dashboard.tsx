import BudgetCard from '../components/dashboard/BudgetCard';
import TransactionList from '../components/transactions/TransactionList';
import { AlertTriangle } from 'lucide-react';

// Temporary mock data
const mockTransactions = [
  {
    id: '1',
    title: 'Salary',
    amount: 5000,
    type: 'income' as const,
    category: 'Salary',
    date: '2024-03-01'
  },
  {
    id: '2',
    title: 'Rent',
    amount: 1500,
    type: 'expense' as const,
    category: 'Housing',
    date: '2024-03-02'
  },
  {
    id: '3',
    title: 'Groceries',
    amount: 300,
    type: 'expense' as const,
    category: 'Food',
    date: '2024-03-03'
  }
];

const Dashboard = () => {
  // Calculate totals for current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthTransactions = mockTransactions.filter(transaction => {
    const transDate = new Date(transaction.date);
    return transDate.getMonth() === currentMonth &&
      transDate.getFullYear() === currentYear;
  });

  const monthlyIncome = thisMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = monthlyIncome - monthlyExpenses;
  const expenseRatio = (monthlyExpenses / monthlyIncome) * 100;
  const isOverBudget = monthlyExpenses > monthlyIncome;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {isOverBudget && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertTriangle size={20} />
            <span>Expenses exceed income this month!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BudgetCard
          title="Monthly Income"
          amount={monthlyIncome}
          type="income"
        />
        <BudgetCard
          title="Monthly Expenses"
          amount={monthlyExpenses}
          type="expense"
          percentage={expenseRatio}
          alert={expenseRatio > 90}
        />
        <BudgetCard
          title="Monthly Balance"
          amount={balance}
          type="balance"
        />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
        </div>

        <TransactionList
          transactions={mockTransactions}
          onEdit={(id) => console.log('Edit:', id)}
          onDelete={(id) => console.log('Delete:', id)}
        />
      </div>
    </div>
  );
}
export default Dashboard;