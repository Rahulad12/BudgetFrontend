import { ArrowUpCircle, ArrowDownCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { useSelector } from 'react-redux';

type BudgetCardType = 'income' | 'expense' | 'balance' | 'saving' | 'budget';

type BudgetCardProps = {
  title: string;
  amount: number;
  type: BudgetCardType;
  percentage?: number;
  alert?: boolean;
  totalExpenseLeft?: number;
  savingGoal?: number;
};

type CardConfig = {
  icon: React.ReactNode;
  amountColor: string;
  trendIcon: React.ReactNode;
};

const BudgetCard = ({
  title,
  amount = 0,
  type,
  percentage,
  alert,
  totalExpenseLeft,
  savingGoal
}: BudgetCardProps) => {
  const calculatedDataState = useSelector((state: any) => state.calculatedData);

  // Derived states
  const isSavingExceeded = savingGoal && amount < savingGoal;
  const isBudgetExceeded = calculatedDataState?.isOverBudget;
  const absoluteAmount = Math.abs(amount);

  // Card configuration
  const cardConfig: Record<BudgetCardType, CardConfig> = {
    income: {
      icon: <ArrowUpCircle className="text-green-500" size={24} />,
      amountColor: 'text-green-600',
      trendIcon: <TrendingUp className="text-green-500" size={16} />
    },
    expense: {
      icon: <ArrowDownCircle className="text-red-500" size={24} />,
      amountColor: alert ? 'text-red-600' : 'text-orange-600',
      trendIcon: isBudgetExceeded ?
        <TrendingDown className="text-red-500" size={16} /> :
        <TrendingUp className="text-green-500" size={16} />
    },
    balance: {
      icon: null,
      amountColor: amount < 0 ? 'text-red-600' : 'text-blue-600',
      trendIcon: isSavingExceeded ?
        <TrendingDown className="text-red-500" size={16} /> :
        <TrendingUp className="text-green-500" size={16} />
    },
    budget: {
      icon: null,
      amountColor: amount < 0 ? 'text-red-600' : 'text-green-600',
      trendIcon: null
    },
    saving: {
      icon: null,
      amountColor: amount < 0 ? 'text-red-600' : 'text-blue-600',
      trendIcon: null
    }
  };

  const getBudgetStatus = () => {
    switch (type) {
      case 'expense':
        if (totalExpenseLeft === undefined) return null;
        const isOverBudget = totalExpenseLeft < 0;
        return {
          label: isOverBudget ? 'Budget Exceeded' : 'Budget Remaining',
          value: Math.abs(totalExpenseLeft),
          color: isOverBudget ? 'text-red-600 font-bold' : 'text-blue-600'
        };

      case 'balance':
      case 'saving':
        if (savingGoal === undefined) return null;
        const remaining = amount - savingGoal;
        const isGoalExceeded = remaining < 0;
        console.log(remaining);
        return {
          label: isGoalExceeded ? 'Goal Exceeded' : 'Goal Remaining',
          value: Math.abs(remaining),
          color: isGoalExceeded ? 'text-red-600 font-bold' : 'text-blue-600'
        };

      case 'budget':
        const isBudgetSet = amount > 0;
        return {
          label: isBudgetSet ? 'Budget Set' : 'Budget Not Set',
          value: 0,
          color: isBudgetSet ? 'text-blue-600' : 'text-red-600 font-bold'
        };

      default:
        return null;
    }
  };

  const status = getBudgetStatus();
  const config = cardConfig[type];

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md ${alert ? 'border-2 border-red-200' : ''
      }`}>
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          {alert && <AlertTriangle className="text-red-500" size={20} />}
          {config.icon}
        </div>
      </div>

      {/* Main Amount */}
      <div className={`text-2xl font-bold ${config.amountColor} mb-2`}>
        ${absoluteAmount.toLocaleString()}
      </div>

      {/* Status Section */}
      {status && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={`flex items-center gap-1 ${status.color}`}>
              {config.trendIcon}
              {status.label}
            </span>
            {status.value > 0 && (
              <span className={status.color}>
                ${status.value.toLocaleString()}
              </span>
            )}
          </div>
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