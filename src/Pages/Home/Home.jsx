import React, { useEffect, useState } from 'react';
import Product from './Product/Product';

const Home = () => {
    const [products, setProduts] = useState([]);

    useEffect(() => {
        fetch('https://ecomerce-server.vercel.app/products',{
            headers:{
                authoraization:`Bearar ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProduts(data);
            })
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 md:mt-5 lg:mt-10 px-2'>
            {
                products.map((product, i) => <Product key={i} product={product}></Product>)
            }
        </div>
    );
};

export default Home;