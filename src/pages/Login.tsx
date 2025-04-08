import Form from '../components/common/Form';
import { authUser } from '../types';
import { login } from '../store/authSlice';
import { loginUser } from '../service/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loginFormValidator } from '../utils/formValidator';
import { setLoading } from '../store/loadingSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const token = useAppSelector((state: any) => state.auth.auth.token);
    // Check auth status on component mount
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const submitHandler = async (data: authUser) => {
        dispatch(setLoading(true));
        const validation = loginFormValidator(data.username, data.password);
        if (validation) {
            toast.error(validation);
            dispatch(setLoading(false));
            return;
        }
        try {
            // Start loading
            dispatch(login({ auth: { success: false, message: '', token: '' }, loading: true }));

            const res = await loginUser(data.username, data.password);

            if (res.success) {
                // Set auth data in redux
                dispatch(login({
                    auth: res,
                    loading: false
                }));
                dispatch(setLoading(false));
                toast.success(res.message);

                // Redirect after short delay
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                dispatch(setLoading(false));
                throw new Error(res.message);
            }
        } catch (error) {
            dispatch(setLoading(false));
            const errMsg = (error as Error).message;
            console.log(errMsg);
            toast.error(errMsg);

            // Stop loading and show error
            dispatch(login({
                auth: { success: false, message: errMsg, token: '' },
                loading: false
            }));
        }
    };

    return (
        <div>
            <Form submitHandler={submitHandler} formType='login' />
        </div>
    );
};

export default Login;
