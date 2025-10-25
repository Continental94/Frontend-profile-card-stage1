// react-app/src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'; 

const LandingPage = () => {
  return (
    <Layout>
      {/* 1. The main blue banner (Hero Section) */}
      <div className="hero wavy-bg">
        <div style={{ padding: '80px 0', maxWidth: '600px' }}>
          <h1>Your Simple, Powerful Ticket Management Solution</h1>
          <p>Track, manage, and resolve issues seamlessly across all departments.</p>
          <div style={{ marginTop: '20px' }}>
            {/* The Login and Get Started buttons */}
            <Link to="/auth/login" className="btn btn-primary" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/auth/signup" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>
      </div>

      {/* 2. The Key Features Section */}
      <div className="features-section" style={{ display: 'flex', gap: '20px', padding: '40px 0' }}>
        <div className="card">
          <h3>Easy Creation</h3>
          <p>Log new issues in seconds with mandatory validation.</p>
        </div>
        <div className="card">
          <h3>Status Tags</h3>
          <p>Instantly see ticket status with required color codes.</p>
        </div>
        <div className="card">
          <h3>Secure Access</h3>
          <p>Protected routes managed via session tokens.</p>
        </div>
      </div>
    </Layout>
  );
};
export default LandingPage;