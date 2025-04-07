import { MonthlyTransaction, BudgetData,calculateDataType } from "../types";

const calculateData = (transactions: MonthlyTransaction, budgetState: BudgetData):calculateDataType => {
    const monthlyIncome = transactions?.monthlyIncome;
    const monthlyExpenses = transactions?.monthlyExpense;
    const balance = transactions?.monthlyBalance;
    const totalExpenseLeft = budgetState?.monthlyExpense - monthlyExpenses;
    const expenseRatio = (monthlyExpenses / budgetState?.monthlyExpense) * 100;
    const isSavingGoalExceed = balance <= budgetState?.savingGoal;
    const isOverBudget = totalExpenseLeft < 0;
    //dispatch the calculated data
    return {
        monthlyIncome,
        monthlyExpenses,
        balance,
        totalExpenseLeft,
        expenseRatio,
        isSavingGoalExceed,
        isOverBudget    
    }
}

export default calculateData