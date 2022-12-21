import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { EcomerceContext } from '../../ContextProvider/ContextProvider';

const Registation = () => {

    const { registerUser, updateUser } = useContext(EcomerceContext);
    const navigate = useNavigate();

    const handelSumit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        registerUser(email, password)
            .then((result) => {
                const user = result.user;

                updateUser(name)
                    .then(() => {
                        fetch('https://ecomerce-server.vercel.app/user', {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                authoraization: `Bearar ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({ name, email })
                        })
                            .then(res => res.json())
                            .then(() => {
                                fetch('https://ecomerce-server.vercel.app/jwt', {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify({ email: user?.email })
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        localStorage.setItem('token', data.token);
                                        toast.success(`Account registered by ${name}`);
                                        navigate('/');
                                        form.reset();
                                    })
                                // jwt token get from server 
                            })
                        // save user to DB
                    })
                    .catch(error => console.error(error));
                // update user name  
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="mt-2 md:mt-3 lg:mt-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={(e) => handelSumit(e)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Full name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>
                            <p className='text-center my-2'>You have already an account <Link className='text-info font-bold' to='/login'>Login</Link></p>
                            <div className="form-control mt-3">
                                <button className="btn btn-info text-white">Registation</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registation;