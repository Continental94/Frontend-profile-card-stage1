import { Navigate } from 'react-router-dom';
// FIX: Change '../utils/auth' to '../utils/data'
import { isAuthenticated } from '../utils/data';

export const ProtectedRoute = ({ children }) => {
  // Check the mandatory localStorage key
  if (!isAuthenticated()) {
    // REQUIRED: Redirect unauthorized users to /auth/login
    console.error('Unauthorized access detected. Redirecting.'); 
    return <Navigate to="/auth/login" replace />;
  }
  return children; // If authenticated, render the children (DashboardPage)
};