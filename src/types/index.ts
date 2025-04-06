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

export type BudgetData = {
  monthlyExpense: number;
  expensesThreshold: number;
  savingGoal: number;
};

export type budgetResponseType = BudgetData[]; // Since you're accessing `budget[0]`


export type incomeResponseType = {
  success: boolean;
  totalIncome: number;
}

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

export type globalResponse = {
  success: boolean,
  message: string,
}

export type authResponseType = {
  success: boolean,
  message: string,
  token: string
}
export type authUser = {
  username: string,
  email: string,
  password: string
}



