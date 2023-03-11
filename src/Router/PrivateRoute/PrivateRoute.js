import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Components/Loader";
import useAuth from "../../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    const location = useLocation()

    if (loading) {
        return <Loader />
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />
};

export default PrivateRoute;