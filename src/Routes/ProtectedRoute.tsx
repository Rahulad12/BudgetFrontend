import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {

     const isLoggedIn = useSelector((state: any) => state.auth.auth.token);
     return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace/>

}
export default ProtectedRoute