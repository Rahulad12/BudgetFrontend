import { useSelector } from 'react-redux'
import Form from '../components/common/Form'
import { registerUser } from '../service/authService'
import { authUser } from '../types'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: any) => state.auth.auth.token);
    if (isLoggedIn) {
        navigate('/');
    }

    const submitHandler = async (data: authUser) => {
        try {
            const res = await registerUser(data.username, data.email, data.password);
            if (res.success) {
                toast.success(res.message);
            }
            else {
                throw new Error(res.message)
            }
        } catch (error) {
            console.log(error);
            const res = (error as Error).message
            toast.error(res);
        }
    }
    return (
        <div>
            <Form submitHandler={submitHandler} />
        </div>
    )
}

export default Register
