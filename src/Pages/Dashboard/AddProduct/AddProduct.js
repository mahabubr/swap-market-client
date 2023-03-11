import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const AddProduct = () => {

    const navigate = useNavigate()

    const { user } = useAuth()

    const handleAddProduct = (e) => {
        e.preventDefault()

        const form = e.target

        const img = form.img.value
        const name = form.name.value
        const price = form.price.value
        const location = form.location.value
        const description = form.description.value
        const category = form.category.value

        const inputInfo = {
            img,
            name,
            price,
            location,
            description,
            category,
            email: user.email
        }

        fetch('https://swap-market-server-six.vercel.app/product', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(inputInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Product Added Successful')
                    navigate('/products')
                    form.reset()
                }
            })
            .catch(e => console.log(e.message))

    }

    return (
        <div>
            <h2 className='text-3xl font-semibold text-center mb-8'>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <input name='img' required type="text" placeholder="Image URL" className="input input-bordered w-full" />
                    <input name='name' required type="text" placeholder="Product Name" className="input input-bordered w-full" />
                    <input name='price' required type="number" placeholder="Product Price" className="input input-bordered w-full" />
                    <input name='location' required type="text" placeholder="Location" className="input input-bordered w-full" />
                    <input name='category' required type="text" placeholder="Category Name" className="input input-bordered w-full" />
                </div>
                <textarea name='description' required className="textarea textarea-bordered w-full mt-3" placeholder="Description"></textarea>
                <div className='flex justify-center'>
                    <button type='submit' className='btn btn-accent mt-4'>Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;