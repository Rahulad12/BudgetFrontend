import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart } from 'recharts';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

const mockExpensesByCategory = [
  { name: 'Housing', value: 1500 },
  { name: 'Food', value: 400 },
  { name: 'Transportation', value: 200 },
  { name: 'Utilities', value: 150 },
  { name: 'Entertainment', value: 100 },
];

const mockMonthlyData = [
  { month: 'Jan', income: 5000, expenses: 3000 },
  { month: 'Feb', income: 5200, expenses: 3200 },
  { month: 'Mar', income: 5000, expenses: 5200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Insights =() => {
  // Calculate insights
  const currentMonth = mockMonthlyData[mockMonthlyData.length - 1];
  const previousMonth = mockMonthlyData[mockMonthlyData.length - 2];
  
  const isOverBudget = currentMonth.expenses > currentMonth.income;
  const expenseChange = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100;
  const incomeChange = ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
      
      {/* Monthly Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isOverBudget && (
            <div className="col-span-full bg-red-50 p-4 rounded-lg flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={24} />
              <div>
                <h3 className="font-medium text-red-800">Budget Alert</h3>
                <p className="text-red-600">Your expenses exceed your income by ${(currentMonth.expenses - currentMonth.income).toLocaleString()}</p>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className={incomeChange >= 0 ? "text-green-500" : "text-red-500"} />
              <h3 className="font-medium">Income Trend</h3>
            </div>
            <p className={`text-lg font-semibold ${incomeChange >= 0 ? "text-green-600" : "text-red-600"}`}>
              {incomeChange >= 0 ? "+" : ""}{incomeChange.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">vs last month</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingDown className={expenseChange <= 0 ? "text-green-500" : "text-red-500"} />
              <h3 className="font-medium">Expense Trend</h3>
            </div>
            <p className={`text-lg font-semibold ${expenseChange <= 0 ? "text-green-600" : "text-red-600"}`}>
              {expenseChange >= 0 ? "+" : ""}{expenseChange.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">vs last month</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium">Largest Expense</h3>
            <p className="text-lg font-semibold text-gray-900">
              {mockExpensesByCategory[0].name}
            </p>
            <p className="text-sm text-gray-500">
              ${mockExpensesByCategory[0].value.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses by Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Expenses by Category
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockExpensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockExpensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Monthly Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Monthly Income vs Expenses
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockMonthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#0088FE" name="Income" />
                <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Insights;