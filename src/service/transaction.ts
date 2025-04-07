import { TRANSACTION_URL, MONTHLY_TRANSACTION_URL } from "./constant";
import { globalResponse, TransactionFormData, Transaction, MonthlyTransactionResponse} from "../types";
import api from "./api";

export const createTransaction = async (
    items: TransactionFormData
): Promise<globalResponse> => {
    try {
        const res = await api.post<globalResponse>(`${TRANSACTION_URL}`, items);
        return res.data;
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
};


export const getTransaction = async (): Promise<Transaction> => {
    try {
        const res = await api.get<Transaction>(`${TRANSACTION_URL}`);
        return res.data;
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
};

export const getMonthlyTransaction = async (): Promise<MonthlyTransactionResponse> => {
    try {
        const res = await api.get<MonthlyTransactionResponse>(`${MONTHLY_TRANSACTION_URL}`);
        console.log(res.data);
        return res.data;
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
};

export const getFilterdTransaction = async (month: string): Promise<MonthlyTransactionResponse> => {
    try {
        const res = await api.get<MonthlyTransactionResponse>(`${MONTHLY_TRANSACTION_URL}/filter?month=${month}`);
        return res.data
    } catch (error:any ) {
        console.error(error);
        throw error.response?.data || error;
    }
}