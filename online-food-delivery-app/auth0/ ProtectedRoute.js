import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;