
//error
export type ErrorType = {
  success: boolean;
  message: string;
}
export type TransactionType = 'income' | 'expense';

export type TransactionFormData = {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
};

export type Transaction = {
  _id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
};


export type MonthlyTransaction = {
  monthlyBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  date: string;
  month: string;
  monthYear: string
  transaction: Transaction[];
}

export type MonthlyTransactionResponse = {
  success: boolean,
  message: string;
  data: MonthlyTransaction[]
}

export type BudgetData = {
  monthlyExpense: number;
  expensesThreshold: number;
  savingGoal: number;
};

export type budgetResponseType = BudgetData[];


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


export type calculateDataType = {
  monthlyIncome: number;
  monthlyExpenses: number;
  balance: number;
  totalExpenseLeft: number;
  expenseRatio: number;
  isSavingGoalExceed: boolean;
  isOverBudget: boolean;
}

