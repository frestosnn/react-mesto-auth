import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ children, loggedIn }) => {
  if (loggedIn === true) {
    return children;
  } else {
    <Navigate to="/sign-up" replace />;
  }
};

export default ProtectedRouteElement;
