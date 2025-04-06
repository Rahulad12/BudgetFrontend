import { incomeResponseType } from "../types";
import api from "./api";
import { INCOME_URL } from "./constant";

const getIncome = async (): Promise<incomeResponseType> => {
    try {
        const res = await api.get<incomeResponseType>(`${INCOME_URL}`);
        return res.data
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
}
export { getIncome };