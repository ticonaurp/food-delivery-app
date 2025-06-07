import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';



const App = () => {
  return (
    <Auth0Provider
      domain="dev-mv6m567ackmmew0y.us.auth0.com"
      clientId="sPDodCel0Qyksn6Wilnw5nJMfeyrwYCu"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        {/* Tu aplicación aquí */}
      </Router>
    </Auth0Provider>
  );
};

export default App;