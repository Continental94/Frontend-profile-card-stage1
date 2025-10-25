// react-app/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export const ProtectedRoute = ({ children }) => {
  // Check the mandatory localStorage key
  if (!isAuthenticated()) {
    // REQUIRED: Redirect unauthorized users to /auth/login
    console.error('Unauthorized access detected. Redirecting.'); 
    return <Navigate to="/auth/login" replace />;
  }
  return children; // If authenticated, render the children (DashboardPage)
};