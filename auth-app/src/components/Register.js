import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../AuthProvider";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const navigate = useNavigate();
    const { setToken } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = {
                username: username,
                password: password
            };
            console.log(user)
            const response = await axios.post('http://localhost:8080/api/users/register', user);const { token } = response.data;

            if (token) {
                setToken(token);

                navigate('/city-actions');
            } else {
                console.error('No token received');
            }
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error);
        }
    };
    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
