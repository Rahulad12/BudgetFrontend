export type TransactionType = 'income' | 'expense';

export type TransactionFormData = {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
};

export type BudgetSettings = {
  monthlyIncome: number;
  monthlyBudget: number;
  warningThreshold: number;
};

export type MonthlyData = {
  income: number;
  expenses: number;
  savings: number;
  transactions: Transaction[];
};

export type CategoryBudget = {
  category: string;
  budget: number;
  spent: number;
};