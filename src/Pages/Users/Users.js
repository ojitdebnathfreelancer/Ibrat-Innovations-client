import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://ecomerce-server.vercel.app/users', {
            headers: {
                authoraization: `Bearar ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
    }, []);
    // get all users 

    return (
        <div className="overflow-x-auto mt-5">
            <table className="table w-[50%] mx-auto">
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => <tr key={i} className='text-center'>
                            <th>{i + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Users;