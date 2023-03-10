import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    const location = useLocation()

    if (loading) {
        return <div className='h-screen grid place-items-center'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />
};

export default PrivateRoute;