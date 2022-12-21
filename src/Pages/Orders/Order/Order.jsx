import React from 'react';
import { toast } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

const Order = ({ product, setProductDelete, productDelete }) => {
    const { productName, productPrice, quantity, productImg, _id } = product;

    const bookDelete = (id) => {
        fetch(`https://ecomerce-server.vercel.app/cart/${id}`, {
            method: "DELETE",
            headers: {
                authoraization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProductDelete(!productDelete);
                toast.success(data.message);
            })
    };
    // delete single product 

    return (
        <div className='flex p-2 md:p-5 lg:p-5 border-2 border-info mt-5 rounded-lg'>
            <div className='flex justify-center items-center'>
                <img className='h-20 w-36 md:w-28 lg:w-28 rounded-md' src={productImg} alt="product" />
            </div>
            <div className='w-full md:flex lg:flex justify-between items-center ml-5'>
                <div>
                    <p>{productName}</p>
                    <p>Quantity {quantity}</p>
                    <p>Price {productPrice}$</p>
                </div>
                <div className='flex justify-center'>
                    <button onClick={() => bookDelete(_id)} className='bg-info h-8 w-8 md:h-12 md:w-12 lg:h-12 lg:w-12 rounded-full flex justify-center items-center'>
                        <MdDelete className='h-6 w-6 md:h-9 md:w-9 lg:h-9 lg:w-9' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;