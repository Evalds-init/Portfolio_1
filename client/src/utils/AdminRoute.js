import AuthContext from '../context/auth/authContext';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};
export default AdminRoute;
