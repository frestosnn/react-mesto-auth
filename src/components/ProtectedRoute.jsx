import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ children, loggedIn }) => {
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to="/sign-up" replace />;
  }
};

export default ProtectedRouteElement;
