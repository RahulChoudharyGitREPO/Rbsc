import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'; // <-- Updated import

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // <-- Updated hook

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login(email, password)
            .then(() => navigate('/dashboard')) // <-- Updated usage
            .catch(error => console.error('Error logging in:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
