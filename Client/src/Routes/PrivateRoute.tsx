// src/Components/PrivateRoute/PrivateRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />
  }
};

export default PrivateRoute;
