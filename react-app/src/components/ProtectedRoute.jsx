import { Navigate } from 'react-router-dom';
// FIX: Must import from the correct utility file
import { isAuthenticated } from '../utils/data';

export const ProtectedRoute = ({ children }) => {
  // Check the mandatory localStorage key
  if (!isAuthenticated()) {
    console.error('Unauthorized access detected. Redirecting.'); 
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};