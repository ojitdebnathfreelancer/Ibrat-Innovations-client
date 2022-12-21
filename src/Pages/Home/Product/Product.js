import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { EcomerceContext } from '../../../ContextProvider/ContextProvider';

const Product = ({ product }) => {

    const { user } = useContext(EcomerceContext);
    const { name, price, img } = product;

    const notUser = () =>{
        toast.error("Add to cart befor login")
    }

    const book = (p) => {
        const info = {
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            productName: p.name,
            productPrice: p.price,
            productImg: p.img,
            quantity: 1,
            productId: p._id
        };

        fetch(`https://ecomerce-server.vercel.app/cart?email=${user?.email}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                authoraization: `Bearar ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then((data) => {
                toast.success(data.message);
            })
    };
    // book produt save to DB 

    return (
        <div className="card h-[500px] bg-base-100 shadow-xl">
            <figure><img src={img} alt="product" /></figure>
            <div className="card-body p-5">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p className='font-semibold'>Price: {price}$</p>
                <div className="card-actions justify-center">
                    {
                        user ? <button onClick={() => book(product)} className='w-full hover:bg-info border-2 border-info rounded-xl hover:text-white font-semibold text-xl py-2 duration-300'>Add To Cart</button>
                            :
                            <button onClick={notUser} className='w-full hover:bg-info border-2 border-info rounded-xl hover:text-white font-semibold text-xl py-2 duration-300'>Add To Cart</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;