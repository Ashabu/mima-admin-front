import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './login.scss';

const Login = () => {
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className = 'login'>
            <h3>Welcome To Mima Admin</h3>
            <input type = 'text' value = {username} onChange = {(e) => setUername(e.target.value)} placeholder = 'Username'/>
            <input type = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = 'Password'/>
            <Link to='home'>Log In</Link>
        </div>
    );
};

export default Login;