import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EcomerceContext } from '../../ContextProvider/ContextProvider';

const Navbar = () => {
    const { user, logoutUser } = useContext(EcomerceContext);
    const navigate = useNavigate();

    const userSignOut = () => {
        logoutUser()
            .then(() => {
                navigate('/login')
            })
    }

    const menuItems = <>
        <li className='lg:ml-3'><Link to='/'>Home</Link></li>
        {
            user?.uid ?
                <>
                    <li className='lg:ml-3'><Link to='/order'>Cart</Link></li>
                    <li className='lg:ml-3'><Link to="/users">Users</Link></li>
                    <li className='lg:ml-3'><button onClick={userSignOut}>LogOut</button></li>
                    <li>{user?.displayName}</li>
                </>
                :
                <>
                    <li className='lg:ml-3'><Link to='/login'>Login</Link></li>
                    <li className='lg:ml-3'><Link to='/registation'>Registaion</Link></li>
                </>
        }
    </>
    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 items-center">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">E-comerce</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;