import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>

            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-16">
                    {/* <!-- Page content here --> */}
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-gray-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li>
                            <NavLink to='/' end className={({ isActive }) => isActive ? 'btn btn-success' : ''}>Add Product</NavLink>
                        </li>
                        <li>
                            <NavLink to='/products' end className={({ isActive }) => isActive ? 'btn btn-success' : ''}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to='/deleted-items' end className={({ isActive }) => isActive ? 'btn btn-success' : ''}>Deleted Items</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;