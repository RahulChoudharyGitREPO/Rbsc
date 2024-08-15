import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'; // <-- Updated import

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate(); // <-- Updated hook

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.register(name, email, password, roles)
            .then(() => navigate('/login')) // <-- Updated usage
            .catch(error => console.error('Error registering:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Roles:</label>
                <input type="text" value={roles} onChange={e => setRoles(e.target.value.split(','))} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
