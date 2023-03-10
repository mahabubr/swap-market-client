import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/LoginAndSIgnUp/Login";
import SignUp from "../Pages/LoginAndSIgnUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element:
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    }
])

export default route