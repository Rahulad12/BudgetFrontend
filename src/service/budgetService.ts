import {  globalResponse, BudgetData,budgetResponseType} from "../types";

import api from "./api";
import { BUDGET_URL } from "./constant";


const createBudget = async (formData: BudgetData): Promise<globalResponse> => {
    try {
        const res = await api.post<globalResponse>(`${BUDGET_URL}`, {
            monthlyexpense: formData.monthlyExpense, expensethreshold: formData.expensesThreshold, savinggoal: formData.savingGoal
        });
        return res.data;
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
};

const getBudget = async (): Promise<budgetResponseType> => {
    try {
        const res = await api.get<budgetResponseType>(`${BUDGET_URL}`);
        return res.data;
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
}

export { createBudget, getBudget }