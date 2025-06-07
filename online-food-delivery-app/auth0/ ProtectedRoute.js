import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return (
    <div>
      {children} {/* Aquí se renderiza el contenido protegido */}
    </div>
  );
};

export default ProtectedRoute;