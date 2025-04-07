import { ArrowUpCircle, ArrowDownCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { useSelector } from 'react-redux';
type BudgetCardProps = {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
  percentage?: number;
  alert?: boolean;
  totalExpenseLeft?: number;
  savingGoal?: number;
};

const BudgetCard = ({
  title,
  amount,
  type,
  percentage,
  alert,
  totalExpenseLeft,
  savingGoal
}: BudgetCardProps) => {
  // Determine colors and icons based on card type

  const calculatedDataState = useSelector((state: any) => state.calculatedData);
  const savingExceedForIcon = savingGoal && amount < savingGoal;
  const budgetExceededIcon = calculatedDataState?.isOverBudget;
  const cardConfig = {
    income: {
      icon: <ArrowUpCircle className="text-green-500" size={24} />,
      amountColor: 'text-green-600',
      trendIcon: <TrendingUp className="text-green-500" size={16} />
    },
    expense: {
      icon: <ArrowDownCircle className="text-red-500" size={24} />,
      amountColor: alert ? 'text-red-600' : 'text-orange-600',
      trendIcon: budgetExceededIcon ? <TrendingDown className="text-red-500" size={16} /> : <TrendingUp className="text-green-500" size={16} />
    },
    balance: {
      icon: null,
      amountColor: amount < 0 ? 'text-red-600' : 'text-blue-600',
      trendIcon: savingExceedForIcon ? <TrendingDown className="text-red-500" size={16} /> : <TrendingUp className="text-green-500" size={16} />
    }
  };

  // Calculate budget status
  const getBudgetStatus = () => {
    if (type === 'expense' && totalExpenseLeft !== undefined) {
      const isOverBudget = totalExpenseLeft < 0;
      return {
        label: isOverBudget ? 'Budget Exceeded' : 'Budget Remaining',
        value: Math.abs(totalExpenseLeft),
        color: isOverBudget ? 'text-red-600 font-bold' : 'text-blue-600'
      };
    }
    if (type === 'balance' && savingGoal !== undefined) {
      const remaining = savingGoal - amount;
      const savingExceed = remaining < savingGoal;
      return {
        label: savingExceed ? 'Goal Exceed' : 'Goal Remaining',
        value: Math.abs(remaining),
        color: savingExceed ? 'text-red-600 font-bold' : 'text-blue-600'
      };
    }
    return null;
  };

  const status = getBudgetStatus();

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md ${alert ? 'border-2 border-red-200' : ''
      }`}>
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          {alert && <AlertTriangle className="text-red-500" size={20} />}
          {cardConfig[type].icon}
        </div>
      </div>

      {/* Main Amount */}
      <div className={`text-2xl font-bold ${cardConfig[type].amountColor} mb-2`}>
        ${Math.abs(amount).toLocaleString()}
      </div>

      {/* Budget/Goal Status */}
      {status && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={`flex items-center gap-1 ${status.color}`}>
              {cardConfig[type].trendIcon}
              {status.label}
            </span>
            <span className={status.color}>
              ${status.value.toLocaleString()}
            </span>
          </div>

          {/* Additional Saving Goal Display */}
          {type === 'balance' && savingGoal !== undefined && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Monthly Goal</span>
              <span>${savingGoal.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {percentage !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{Math.min(100, percentage)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${percentage > 90 ? 'bg-red-600' : 'bg-blue-600'
                }`}
              style={{ width: `${Math.min(100, percentage)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;