import React, { useContext, useState } from 'react';
import './login.scss';
import { AppContext } from '../../Context/AppContext';
import AppButton from '../../Components/UI/AppButton/AppButton';
import User from '../../Services/UserServices';
import AuthService from '../../Services/AuthService';
import { useHistory } from "react-router";

const Login = () => {
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { setUserAuthorized } = useContext(AppContext);
    const history = useHistory();

    const login = () => {
        setBtnLoading(true);
        let data = {
            userName: username,
            password: password,
        }
        User.SignIn(data).then(res => {
            if (res.data.token) {
                AuthService.setToken(res.data.token, res.data.refresh_token)
                setUserAuthorized(true);
                setBtnLoading(false);
                history.push('/home');
            } else {
                setErrorMessage(res.data.errorMessage.message);
                setBtnLoading(false);
            }

        }).catch(e => {
            console.log(e)
            setBtnLoading(false);
        });
    }

    return (
        <div className='login'>
            <h3>Welcome To Mima Admin</h3>
            <input type='text' value={username} onChange={(e) => setUername(e.target.value)} placeholder='Username' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            {errorMessage ? <p style={{ color: 'red', fontSize: 14 }}>{errorMessage}</p> : null}
            <AppButton onClick={login} loading={btnLoading}>Log In</AppButton>
        </div>
    );
};

export default Login;