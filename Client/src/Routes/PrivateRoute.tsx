// src/Components/PrivateRoute/PrivateRoute.tsx
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const loginState = useSelector((state: any) => state.login.text);
  return loginState === 'Logout' ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
