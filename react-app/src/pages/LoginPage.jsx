// react-app/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // FIX: Link is imported here
import Layout from '../components/Layout'; // FIX: Layout is imported here
import { login, showToast } from '../utils/data'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 

    if (!username || !password) {
        setError('Username and password are required.'); 
        showToast('Login failed: Missing fields.', 'error');
        return;
    }

    const result = login(username, password);
    
    if (result.success) {
      showToast('Login successful! Redirecting...', 'success'); 
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setError(result.message);
      showToast('Login failed.', 'error');
    }
  };

  return (
    <Layout>
      <div className="auth-container card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username (Test: test)</label>
          <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />

          <label htmlFor="password">Password (Test: password)</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          
          <p className="error-message" style={{ color: '#dc3545' }}>{error}</p>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Login</button>
        </form>
        
        {/* The link that takes you to the Create Account page */}
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
            New User? <Link to="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </Layout>
  );
};
export default LoginPage;