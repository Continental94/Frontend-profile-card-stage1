// react-app/src/components/Layout.jsx
import React from 'react';
// *** FIX 1: Must import Link and useLocation for Home button/Logout logic ***
import { Link, useLocation } from 'react-router-dom'; 
import { handleLogout } from '../utils/data'; // Assuming you created this utility file

const Layout = ({ children }) => {
  const location = useLocation(); 
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <>
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <h1>Infinity TicketApp</h1> 
          
          <nav style={{ display: 'flex', alignItems: 'center' }}>
            
            {/* *** HOME BUTTON FIX: Placed correctly inside the header nav *** */}
            <Link to="/" className="nav-link" style={{ marginRight: '15px', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
          
            {/* Show Logout button only on the dashboard */}
            {isDashboard && (
                <button className="btn btn-danger" onClick={() => {
                    handleLogout();
                    window.location.href = '/auth/login'; 
                }}>Logout</button>
            )}
          </nav>
        </div>
      </header>

      <main className="container"> 
        {children}
      </main>

      <footer>
        <div className="container" style={{ textAlign: 'center' }}>
          <p>&copy; 2025 Infinity TicketApp. All rights reserved. | Max Width: 1440px</p>
        </div>
      </footer>
    </>
  );
};
export default Layout;