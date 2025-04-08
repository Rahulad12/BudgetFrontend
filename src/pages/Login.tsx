import Form from '../components/common/Form';
import { authUser } from '../types';
import { login } from '../store/authSlice';
import { loginUser } from '../service/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginFormValidator } from '../utils/formValidator';
import { setLoading } from '../store/loadingSlice';
import { useAppDispatch } from '../hooks/redux';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
            const res = await loginUser(data.username, data.password);

            if (res.success) {
                dispatch(login(res));
                dispatch(setLoading(false));
                toast.success(res.message);

                // Redirect after short delay
                setTimeout(() => {
                    navigate('/dashboard');
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
        }
    };
    return (
        <div>
            <Form submitHandler={submitHandler} formType='login' />
        </div>
    );
};

export default Login;
