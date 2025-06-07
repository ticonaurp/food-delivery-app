import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <div>No estás autenticado</div>;
  }

  return (
    <div>
      <h2>Bienvenido, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;