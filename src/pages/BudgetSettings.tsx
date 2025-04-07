import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { createBudget } from '../service/budgetService';
import { toast } from 'react-toastify';
import { BudgetData, incomeResponseType } from "../types/index";
import { useDispatch, useSelector } from 'react-redux';
import { getIncome } from '../service/incomeService';
import { addIncome } from '../store/incomeSlice';
const BudgetSettings = () => {
  const dispatch = useDispatch();
  const monthlyIncome = useSelector((state: any) => state.income.totalIncome);

  useEffect(() => {
    async function fetchIncome() {
      try {
        const income: incomeResponseType = await getIncome();
        dispatch(addIncome(income));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
    fetchIncome();
  }, [dispatch]);

  const [formData, setFormData] = useState<BudgetData>({
    monthlyExpense: 0,
    expensesThreshold: 50,
    savingGoal: 0,
  });
  const isValidBudget = formData.monthlyExpense <= monthlyIncome;
  const isThresholdValid =
    formData.expensesThreshold >= 1 && formData.expensesThreshold <= 100;

  const isFormValid = isValidBudget && isThresholdValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const data = await createBudget(formData);
      if (data?.success) {
        toast.success(data.message);
      } else {
        throw new Error(data?.message || 'Unknown error');
      }
    } catch (error) {
      const res = (error as Error).message;
      toast.error(res);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Budget Settings</h1>
      <p className="text-sm text-gray-500 mb-6">
        Set your monthly expense plan, savings goal, and threshold for alerts.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Monthly Expenses */}
        <div>
          <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-700">
            Monthly Expenses
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <input
              type="number"
              id="monthlyExpenses"
              value={formData.monthlyExpense}
              onChange={(e) =>
                setFormData({ ...formData, monthlyExpense: Number(e.target.value) })
              }
              className="pl-7 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter monthly expenses"
              required
            />
          </div>
          {!isValidBudget && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertTriangle size={16} />
              Expenses cannot exceed monthly income (${monthlyIncome})
            </p>
          )}
        </div>

        {/* Savings Goal */}
        <div>
          <label htmlFor="savingGoal" className="block text-sm font-medium text-gray-700">
            Monthly Saving Goal
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <input
              type="number"
              id="savingGoal"
              value={formData.savingGoal}
              onChange={(e) =>
                setFormData({ ...formData, savingGoal: Number(e.target.value) })
              }
              className="pl-7 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Set saving goal"
              required
            />
          </div>
        </div>

        {/* Warning Threshold */}
        <div>
          <label htmlFor="warningThreshold" className="block text-sm font-medium text-gray-700">
            Warning Threshold (%)
          </label>
          <input
            type="number"
            id="warningThreshold"
            value={formData.expensesThreshold}
            onChange={(e) =>
              setFormData({ ...formData, expensesThreshold: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="100"
            placeholder="Set alert threshold"
            required
          />
          {!isThresholdValid && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertTriangle size={16} />
              Threshold must be between 1 and 100
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Get alerts when expenses reach this percentage of your budget.
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetSettings;
