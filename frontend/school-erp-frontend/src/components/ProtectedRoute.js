import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route Component
const ProtectedRoute = ({ component: Component }) => {
    const token = localStorage.getItem('token');
  
    return token ? <Component /> : <Navigate to="/login" />;
  };

export default ProtectedRoute;
