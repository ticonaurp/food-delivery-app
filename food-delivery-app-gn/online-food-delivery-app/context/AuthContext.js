// src/context/AuthContext.js
import React, { createContext, useCallback, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

const discovery = {
  authorizationEndpoint: `https://${Constants.expoConfig.extra.auth0Domain}/authorize`,
  tokenEndpoint: `https://${Constants.expoConfig.extra.auth0Domain}/oauth/token`,
  revocationEndpoint: `https://${Constants.expoConfig.extra.auth0Domain}/v2/logout`,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [guestAddress, setGuestAddress] = useState(null); 

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: Constants.expoConfig.extra.auth0ClientId,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      scopes: ['openid', 'profile', 'email'],
      responseType: 'token',
    },
    discovery
  );

  const login = useCallback(() => {
    promptAsync({ useProxy: true });
  }, [promptAsync]);

  const loginAsGuest = useCallback((address, coords) => {
    if (typeof address !== 'string' || !coords?.latitude || !coords?.longitude) {
      console.warn('⚠️ Dirección o coordenadas inválidas en loginAsGuest');
      return;
    }

    setUser({ guest: true });
    setGuestAddress({ address, coords });
  }, []);

  const logout = () => {
    setUser(null);
    setGuestAddress(null);
  };

  useEffect(() => {
    if (result?.type === 'success') {
      const { access_token } = result.params;

      fetch(`https://${Constants.expoConfig.extra.auth0Domain}/userinfo`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error('Error obteniendo datos de usuario:', err));
    }
  }, [result]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginAsGuest,
        logout,
        guestAddress, // { address, coords }
        loading: !request,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
