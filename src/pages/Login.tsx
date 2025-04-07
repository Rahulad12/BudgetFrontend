import Form from '../components/common/Form';
import { authUser } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { loginUser } from '../service/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state: any) => state.auth.auth.token);
    // Check auth status on component mount
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const submitHandler = async (data: authUser) => {
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

                toast.success(res.message);

                // Redirect after short delay
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
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
            <Form submitHandler={submitHandler} />
        </div>
    );
};

export default Login;
