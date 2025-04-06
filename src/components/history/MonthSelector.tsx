import { ChevronLeft, ChevronRight } from 'lucide-react';

type MonthSelectorProps = {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
};

const MonthSelector =({ currentDate, onMonthChange }: MonthSelectorProps)=> {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
      <button
        onClick={handlePreviousMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="text-lg font-medium">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </div>
      
      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
        disabled={
          currentDate.getMonth() === new Date().getMonth() &&
          currentDate.getFullYear() === new Date().getFullYear()
        }
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
export default MonthSelector;