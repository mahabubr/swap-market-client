import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import useAuth from '../../../Hooks/useAuth';

const Products = () => {

    const [loading, setLoading] = useState(true)

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const pages = Math.ceil(count / size);


    // const { user: { email } } = useAuth()

    //email=${email}&

    useEffect(() => {
        fetch(`http://localhost:5000/product?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setProducts(data.products)
                setCount(data.count);
            })
    }, [page, size])

    if (loading) {
        return <Loader />
    }

    const handleDeleteProduct = (product) => {
        const confirm = window.confirm(`Are Your Sure to Delete ${product.name}`)
        if (confirm) {
            fetch(`http://localhost:5000/product/${product._id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success(`${product.name} Deleted Successful`)
                        const remainingProduct = products.filter(pd => pd._id !== product._id)
                        setProducts(remainingProduct)
                    }
                })
                .catch(e => toast.error(e.message))
        }
    }


    return (
        <div>
            <div className='md:flex space-y-4 md:space-y-0 justify-between my-2'>
            <h2 className='text-3xl font-semibold text-center'>Products</h2>
                <input name='img' required type="text" placeholder="Search Here" className="input input-bordered w-full md:w-8/12 lg:w-6/12" />
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update / Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map(product =>
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
                                    <th>
                                        <Link to={`/product-update/${product._id}`}>
                                            <button className="btn btn-ghost btn-xs">Update</button>
                                        </Link>
                                        <button onClick={() => handleDeleteProduct(product)} className="btn btn-ghost btn-xs">Delete</button>
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update / Delete</th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>

            <div className='mt-6 text-center'>
                {
                    [...Array(pages).keys()].map(number =>
                        <button
                            key={number}
                            className={page === number ? 'btn' : 'm-2 btn btn-outline'}
                            onClick={() => setPage(number)}
                        >
                            {number + 1}
                        </button>)
                }
                <select className='btn ml-6' onChange={event => setSize(event.target.value)}>
                    <option value="5" selected>5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>

        </div>
    );
};

export default Products;