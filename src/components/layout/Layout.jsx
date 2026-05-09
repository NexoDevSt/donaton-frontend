import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        backgroundColor: 'var(--color-dark)', 
        color: 'white',
        fontSize: '0.9rem' 
      }}>
        &copy; {new Date().getFullYear()} Donaton - Nexo Dev Studio
      </footer>
    </div>
  );
};

export default Layout;