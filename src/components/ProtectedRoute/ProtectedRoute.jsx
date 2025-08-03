import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';

function ProtectedRoute({ children, allowedRoles }) {
  const isUserLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const homePath = userRole === 'STUDENT' ? '/pages/student/home' : '/pages/employee/borrow';
    return <Navigate to={homePath} />; 
  }

  return <MainLayout>{children}</MainLayout>;
}

export default ProtectedRoute;