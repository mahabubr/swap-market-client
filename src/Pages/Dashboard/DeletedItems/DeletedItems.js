import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const DeletedItems = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    const [deleted, setDeleted] = useState([])
    useEffect(() => {
        fetch('https://swap-market-server-six.vercel.app/deleted-items')
            .then(res => res.json())
            .then(data => setDeleted(data))
    }, [])

    const handleRecover = (product) => {
        fetch(`https://swap-market-server-six.vercel.app/deleted-items/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {

                    const recoverInfo = {
                        img: product.img,
                        name: product.name,
                        price: product.price,
                        location: product.location,
                        description: product.description,
                        category: product.category,
                        email: user.email
                    }

                    fetch('https://swap-market-server-six.vercel.app/product', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(recoverInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Recover Successful')
                                navigate('/products')
                            }
                        })
                        .catch(e => toast.error(e.message))
                }
            }
            )
    }

    return (
        <div>
            <div className="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Product automatically Deleted in 30 Days</span>
                </div>
            </div>
            <div className="overflow-x-auto w-full mt-5">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Recover</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            deleted.map(product =>
                                <tr key={product._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.img} alt="Products" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.name.slice(0, 30)}</div>
                                                <div className="text-sm opacity-50">{product.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        $ {product.price}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{product.category}</span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleRecover(product)} className="btn btn-ghost btn-xs">Recover</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeletedItems;