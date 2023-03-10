import { useContext } from "react";
import { AUTH_CONTEXT } from "../Contexts/AuthProvider";

const useAuth = () => {
    const context = useContext(AUTH_CONTEXT)
    return context
};

export default useAuth;