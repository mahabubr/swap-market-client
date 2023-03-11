import React from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const ProductUpdate = () => {

    const { img, name, price, _id } = useLoaderData()
    const navigate = useNavigate()

    const handleProductUpdate = (e) => {

        e.preventDefault()

        const form = e.target

        const img = form.img.value
        const name = form.name.value
        const price = form.price.value

        const updateValue = {
            img,
            name,
            price
        }

        fetch(`https://swap-market-server-six.vercel.app/product/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateValue)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(name, 'Update Successful')
                    navigate('/products')
                }
            })
            .catch(e => console.log(e.message))

    }

    return (
        <div>
            <h2 className='text-3xl font-semibold text-center mb-8'>Update Product Details</h2>
            <form onSubmit={handleProductUpdate} className='space-y-2 w-10/12 md:w-8/12 lg:w-6/12 mx-auto'>
                <input defaultValue={img} name='img' required type="text" placeholder="Image URL" className="input input-bordered w-full" />
                <input defaultValue={name} name='name' required type="text" placeholder="Product Name" className="input input-bordered w-full" />
                <input defaultValue={price} name='price' required type="number" placeholder="Product Price" className="input input-bordered w-full" />
                <div className='flex justify-center'>
                    <button type='submit' className='btn btn-accent mt-4'>Update Product Details</button>
                </div>
            </form>
        </div>
    );
};

export default ProductUpdate;