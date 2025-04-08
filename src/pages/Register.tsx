import { useSelector } from 'react-redux'
import Form from '../components/common/Form'
import { registerUser } from '../service/authService'
import { authUser } from '../types'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { registerFormValidator } from '../utils/formValidator'
import { setLoading } from '../store/loadingSlice'
import { useAppDispatch } from '../hooks/redux'
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useSelector((state: any) => state.auth.auth.token);

    // Check auth status on component mount
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const submitHandler = async (data: authUser) => {
        dispatch(setLoading(true));
        const validation = registerFormValidator(data.username, data.email, data.password);
        if (validation) {
            toast.error(validation);
            dispatch(setLoading(false));
            return;
        }
        try {
            const res = await registerUser(data.username, data.email, data.password);
            if (res.success) {
                toast.success(res.message);
                dispatch(setLoading(false));
                navigate('/login');
                
            }
            else {
                dispatch(setLoading(false));
                throw new Error(res.message)
            }   
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error);
            const res = (error as Error).message
            toast.error(res);
        }
    }
    return (
        <div>
            <Form submitHandler={submitHandler} formType='register'/>
        </div>
    )
}

export default Register
