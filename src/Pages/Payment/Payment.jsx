import React, { useContext } from 'react';
import { EcomerceContext } from '../../ContextProvider/ContextProvider';
import './Payment.css';

const Payment = () => {
    const { user } = useContext(EcomerceContext);

    return (
        <div className='order w-[100%] md:w-[50%] lg:w-[35%] mx-auto mt-3 md:mt-5 lg:mt-10 px-2'>
            <div className='flex p-2 md:p-5 lg:p-5 border-2 border-info mt-5 rounded-lg'>
                <div className='payment flex flex-col w-full'>
                    <p className='text-2xl font-bold text-center mb-5'>Total Cost: {localStorage.getItem("total")}$</p>
                    <input type="text" defaultValue={user?.displayName} placeholder='Please enter your address' required/>
                    <input type="email" defaultValue={user?.email} placeholder='Please enter your email' required />
                    <input type="text" placeholder='Please enter your address' required />
                    <input type="text" placeholder='Please enter your card number' required />
                    <button className='btn btn-info mt-2'>Pay</button>
                </div>
            </div>
        </div>
    );
};

export default Payment;