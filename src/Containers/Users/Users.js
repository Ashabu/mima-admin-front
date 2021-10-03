import React, { useEffect, useState } from 'react';
import './users.scss'
import AppLayout from '../../Components/AppLayout/AppLayout';
import axios from 'axios'

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getUsers').then(res => {
            setUsers(res.data.data.users)
        })
    }, [])
    return (
        <AppLayout>
            <h1>System Users</h1>
            <div>
            {users?.map((u, i) => (
                <div key = {i} style={{display: 'flex', width: 400}}>
                    <p style={{marginRight: 20}}>username: {u.userName}</p>
                    <p style={{marginRight: 20}}>name: {u.name}</p>
                    <p style={{marginRight: 20}}>surname: {u.surname}</p>

                </div>
            ))}
            </div>
            
        </AppLayout>
    );
};

export default Users;