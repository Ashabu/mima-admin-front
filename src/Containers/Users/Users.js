import React, { useEffect, useState } from 'react';
import './users.scss'
import AppLayout from '../../Components/AppLayout/AppLayout';
import UserList from '../../Components/ItemLIst/UserList';
import User from '../../Services/UserServices';
import AppButton from '../../Components/UI/AppButton/AppButton';

const Users = () => {

    const [users, setUsers] = useState([]);


    useEffect(() => {
       User.GetUsers().then(res => {
            setUsers(res.data.data.users)
        })
    }, [])





    return (
        <AppLayout>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>System Users</h1>
                <AppButton
                    buttonClass='button-add'
                    onClick={() => { setActionType('NEW'); setShowModal(true) }}>
                    დამატება
                </AppButton>
                <div style={{ width: '100%', maxWidth: 500 }}>
                    {users?.map((u, i) => (
                        <UserList key={i} data={u} index={i} />
                    ))}
                </div>
            </div>


        </AppLayout>
    );
};

export default Users;