// react-app/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all required pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// *** THIS IS THE CREATE ACCOUNT PAGE ***
import SignupPage from './pages/SignupPage'; 

// Import the ProtectedRoute component for the dashboard
import { ProtectedRoute } from './components/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        
        {/* *** ROUTE FOR THE CREATE ACCOUNT PAGE *** */}
        <Route path="/auth/signup" element={<SignupPage />} /> 

        {/* Protected Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Optional: Add a catch-all 404 route if needed */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);