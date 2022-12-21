import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EcomerceContext } from '../../ContextProvider/ContextProvider';
import Order from './Order/Order';

const Orders = () => {

    const { user } = useContext(EcomerceContext);
    const [products, setProduts] = useState([]);
    const [productDelete, setProductDelete] = useState(false);

    useEffect(() => {
        fetch(`https://ecomerce-server.vercel.app/cart?email=${user?.email}`, {
            headers: {
                authoraization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProduts(data);
            })
    }, [productDelete, user]);

    let total = 0;
    let quantity = 0;
    for (const product of products) {
        total = total + parseInt(product.productPrice) * parseInt(product.quantity);
        quantity = quantity + parseInt(product.quantity)
    };
    localStorage.setItem('total', total);

    return (
        <>
            {
                products.length !== 0 ?
                    <>
                        <div className='px-2'>
                            <div className='order w-[100%] md:w-[80%] lg:w-[50%] mx-auto mt-3 md:mt-5 lg:mt-10'>
                                {
                                    products.map((product, i) => <Order key={i} product={product} setProductDelete={setProductDelete} productDelete={productDelete}></Order>)
                                }
                                <div className='mt-2 flex justify-center items-center'>
                                    <div className='w-[50%] rounded-md text-center'>
                                        <p className='text-xl font-semibold'>Products: {products?.length}</p>
                                        <p className='text-xl font-semibold'>Total Quanity: {quantity}</p>
                                        <p className='text-xl font-semibold'>Total Cost: {total}$</p>
                                        <Link to='/payment'>
                                            <button className='btn btn-info mt-2 text-white font-bold'>Payment</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <p className='text-center text-2xl font-bold mt-5'>Product Not Available</p>
            }
        </>
    );
};

export default Orders;