import { getUser } from "../service/authService";
import { AppDispatch } from "../store";
import { user } from "../store/authSlice";
import { setLoading } from "../store/loadingSlice";
export const fetchUser = async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await getUser();
        const payload = response.data;
        dispatch(user(payload));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
}