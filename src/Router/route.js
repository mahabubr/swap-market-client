import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Products from "../Pages/Dashboard/Products/Products";
import ProductUpdate from "../Pages/Dashboard/Products/ProductUpdate/ProductUpdate";
import Login from "../Pages/LoginAndSIgnUp/Login";
import SignUp from "../Pages/LoginAndSIgnUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            // {
            //     path: '/',
            //     element:
            //         <PrivateRoute>
            //             <Dashboard />
            //         </PrivateRoute>
            // },
            {
                path: '/',
                element:
                    <PrivateRoute>
                        <AddProduct />
                    </PrivateRoute>
            },
            {
                path: '/products',
                element:
                    <PrivateRoute>
                        <Products />
                    </PrivateRoute>
            },
            {
                path: '/product-update/:id',
                element:
                    <PrivateRoute>
                        <ProductUpdate />
                    </PrivateRoute>,
                loader: async ({ params }) => fetch(`https://swap-market-server-six.vercel.app/product/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('SWAP-MARKET')}`
                    }
                })
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