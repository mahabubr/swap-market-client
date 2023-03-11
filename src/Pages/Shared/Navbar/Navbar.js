import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    // const NavContent = () => {
    //     return (
    //         <>
    //             <li><a>Item 1</a></li>
    //         </>
    //     )
    // }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log Out Successful')
                navigate('/login')
            })
            .catch(e => toast.error(e.message))
    }

    return (
        <div className="navbar bg-base-100 container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <NavContent /> */}
                        {
                            user
                                ?
                                <button onClick={handleLogOut} className="btn btn-error">Log Out</button>
                                :
                                <Link to='/signup'>
                                    <button className="btn btn-primary">Register</button>
                                </Link>
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Swap Market</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* <NavContent /> */}
                </ul>
            </div>
            <div className="navbar-end">
                <div className='hidden lg:flex'>
                    {
                        user
                            ?
                            <button onClick={handleLogOut} className="btn btn-error">Log Out</button>
                            :
                            <Link to='/signup'>
                                <button className="btn btn-primary">Register</button>
                            </Link>
                    }
                </div>
                <label htmlFor="my-drawer-2" className="btn ml-4 btn-primary drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;