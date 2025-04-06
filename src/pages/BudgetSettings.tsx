import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBudgetSettings } from '../store/budgetSettingsSlice';
import type { RootState } from '../store';
import { AlertTriangle } from 'lucide-react';

const BudgetSettings =()=> {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.budgetSettings);
  
  const [formData, setFormData] = useState({
    monthlyIncome: settings.monthlyIncome.toString(),
    monthlyBudget: settings.monthlyBudget.toString(),
    warningThreshold: settings.warningThreshold.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateBudgetSettings({
      monthlyIncome: Number(formData.monthlyIncome),
      monthlyBudget: Number(formData.monthlyBudget),
      warningThreshold: Number(formData.warningThreshold),
    }));
  };

  const isValidBudget = Number(formData.monthlyBudget) <= Number(formData.monthlyIncome);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Budget Settings</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">
              Monthly Income
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                className="pl-7 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700">
              Monthly Budget
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="monthlyBudget"
                value={formData.monthlyBudget}
                onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                className={`pl-7 block w-full rounded-md ${
                  isValidBudget ? 'border-gray-300' : 'border-red-300'
                } focus:ring-blue-500 focus:border-blue-500`}
                min="0"
                step="0.01"
                required
              />
            </div>
            {!isValidBudget && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle size={16} />
                Budget cannot exceed monthly income
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="warningThreshold" className="block text-sm font-medium text-gray-700">
              Warning Threshold (%)
            </label>
            <input
              type="number"
              id="warningThreshold"
              value={formData.warningThreshold}
              onChange={(e) => setFormData({ ...formData, warningThreshold: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="100"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              You'll receive warnings when expenses reach this percentage of your budget
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={!isValidBudget}
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
export default BudgetSettings;