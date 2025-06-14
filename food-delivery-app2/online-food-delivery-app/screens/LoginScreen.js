// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { loginWithAuth0 } from '../auth/useAuth0';

import * as AuthSession from 'expo-auth-session';

const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
console.log('🔁 Redirect URI:', redirectUri);

export default function LoginScreen() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const userInfo = await loginWithAuth0();
      setUser(userInfo);
    } catch (error) {
      alert("Error en login: " + error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <Text>Bienvenido {user.name}</Text>
      ) : (
        <Button title="Iniciar sesión con Auth0" onPress={handleLogin} />
      )}
    </View>
  );
}
