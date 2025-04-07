import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalResponse, TransactionFormData } from '../types';
import { createTransaction } from '../service/transactionService';
import { toast } from 'react-toastify';

const AddTransaction = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TransactionFormData>({
    title: '',
    amount: 0,
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: globalResponse = await createTransaction(formData);
      if (res?.success) {
        toast.success(res.message);
        navigate('/');
      }
      else {
        throw Error(res.message)
      }
    } catch (error) {
      console.log(error);
      const res = (error as Error).message
      toast.error(res);
    }

  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Transaction</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Insurance">Insurance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Savings">Savings</option>
              <option value="Personal">Personal</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
