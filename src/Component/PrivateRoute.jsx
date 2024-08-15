import React from 'react';
import { Navigate } from 'react-router-dom'; // <-- Updated import
import authService from '../services/authService';

const PrivateRoute = ({ children, roles }) => {
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
        // If the user is not logged in, redirect them to the login page
        return <Navigate to="/login" />;
    }

    // Check if the current user has any of the required roles
    const hasRequiredRole = roles.some(role => currentUser.roles.includes(role));

    if (!hasRequiredRole) {
        // If the user doesn't have the required role, redirect them to the home page
        return <Navigate to="/" />;
    }

    // If the user is logged in and has the required role, render the children components
    return children;
};

export default PrivateRoute;
