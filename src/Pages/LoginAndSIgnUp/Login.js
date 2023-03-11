import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
    const { googleSignIn, loginUser } = useAuth()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = () => {
        setError('')
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return setError('Please Provide Valid Email')
        }
        if (!/(?=.{6,})/.test(password)) {
            return setError('Password At Least 6 Characters')
        }

        loginUser(email, password)
            .then(result => {
                const user = result.user
                toast.success('Login Successful')

                const currentUser = {
                    email: user.email
                }

                // get jwt token

                fetch('https://swap-market-server-six.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('SWAP-MARKET', data.token);
                        navigate(from, { replace: true });
                    });


            })
            .catch(e => toast.error(e.message))
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user
                toast.success('Login Successful')

                const currentUser = {
                    email: user.email
                }

                // get jwt token

                fetch('https://swap-market-server-six.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('SWAP-MARKET', data.token);
                        navigate(from, { replace: true });
                    });

            })
            .catch(e => toast.error(e.message))
    }

    return (
        <div className='my-20 grid place-items-center'>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className='text-3xl font-bold text-center text-primary'>Login</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input onBlur={(e) => setEmail(e.target.value)} type="text" name='email' placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input onBlur={(e) => setPassword(e.target.value)} type="password" name='password' placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <Link to='/login' className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        {
                            error &&
                            <div className="alert alert-error shadow-lg py-1 px-2 font-semibold mb-2">
                                <div className='text-white text-xs'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className='text-white text-xs'>{error}</span>
                                </div>
                            </div>
                        }
                        <button onClick={handleLogin} className="btn btn-primary">Login</button>
                    </div>
                    <p className='text-sm text-center'>New in this website ? <Link className='text-base font-medium text-indigo-600' to='/signup'>Please Sign Up</Link></p>
                    <div className="form-control mt-6">
                        <button onClick={handleGoogleSignIn} className="btn btn-secondary btn-outline">Google Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;