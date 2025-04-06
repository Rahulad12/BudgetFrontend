import { ArrowUpCircle, ArrowDownCircle, AlertTriangle } from 'lucide-react';

type BudgetCardProps = {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
  percentage?: number;
  alert?: boolean;
};

const BudgetCard = ({ title, amount, type, percentage, alert }: BudgetCardProps)=> {
  const getIcon = () => {
    switch (type) {
      case 'income':
        return <ArrowUpCircle className="text-green-500" size={24} />;
      case 'expense':
        return <ArrowDownCircle className="text-red-500" size={24} />;
      default:
        return null;
    }
  };

  const getAmountColor = () => {
    switch (type) {
      case 'income':
        return 'text-green-600';
      case 'expense':
        return alert ? 'text-red-600' : 'text-orange-600';
      default:
        return amount < 0 ? 'text-red-600' : 'text-blue-600';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${alert ? 'border-2 border-red-200' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          {alert && <AlertTriangle className="text-red-500" size={20} />}
          {getIcon()}
        </div>
      </div>
      
      <div className={`text-2xl font-bold ${getAmountColor()}`}>
        ${Math.abs(amount).toLocaleString()}
      </div>
      
      {percentage !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full ${
                percentage > 90 ? 'bg-red-600' : 'bg-blue-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default BudgetCard;