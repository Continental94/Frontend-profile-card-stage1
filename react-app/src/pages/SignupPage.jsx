// react-app/src/pages/SignupPage.jsx
// THIS IS THE CREATE ACCOUNT PAGE

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { showToast } from '../utils/data';

const SignupPage = () => {
    // State for the four mandatory fields: Username, Email, Password, Confirm Password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // MANDATORY: Password matching validation
        if (password !== confirmPassword) {
            setError('Error: Password and Confirm Password must match.');
            showToast('Signup failed: Passwords do not match.', 'error');
            return;
        }

        showToast('Account successfully created! Please log in.', 'success');
        
        setTimeout(() => navigate('/auth/login'), 1000);
    };

    return (
        <Layout>
            <div className="auth-container card">
                <h2>Create Account</h2> {/* The required heading */}
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
                    
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    
                    {error && <p className="error-message" style={{ color: '#dc3545' }}>{error}</p>}
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Sign Up</button>
                </form>
                
                <p style={{ marginTop: '20px', textAlign: 'center' }}>
                    Already have an account? <Link to="/auth/login">Login</Link>
                </p>
            </div>
        </Layout>
    );
};
export default SignupPage;