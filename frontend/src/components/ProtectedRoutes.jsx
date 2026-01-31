import toast from "react-hot-toast";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children, role }) => {
    const { user, status } = useSelector(x => x.auth)
    if (status === "pending")
        return <div> loading</div>
            ;
    if (!user) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        return <Navigate to='/login' replace />
    }
    if (role && user.role !== role) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        toast.error('unauthorized')
        return <Navigate to='/register' replace />
    }
    return children
}
export default ProtectedRoutes