import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { EcomerceContext } from '../../ContextProvider/ContextProvider';

const Login = () => {
    const { loginUser } = useContext(EcomerceContext);
    const navigate = useNavigate();

    const handelSumit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then((result) => {

                const user = result.user;

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
                        toast.success("Logged In");
                        form.reset();
                        navigate('/');
                    })
            })
    };

    return (
        <div className="mt-2 md:mt-3 lg:mt-5">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={(e) => handelSumit(e)}>
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
                                <label className="label">
                                    <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <p className='text-center my-2'>You haven't account <Link className='text-info font-bold' to='/registation'>Registation</Link></p>
                            <div className="form-control mt-6">
                                <button className="btn btn-info text-white">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;