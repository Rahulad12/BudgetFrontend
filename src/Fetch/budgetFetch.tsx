
import { getBudget } from "../service/budgetService";
import { AppDispatch } from "../store";
import { addBudget } from "../store/budgetSettingsSlice";
import { setLoading } from "../store/loadingSlice";
import { BudgetData } from "../types";

export const getBudgetFetch = async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await getBudget();
        const payload: BudgetData = response[0];
        console.log(payload);
        dispatch(addBudget(payload));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
};