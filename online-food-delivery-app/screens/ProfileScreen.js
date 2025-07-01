// src/screens/ProfileScreen.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, login, logout, loading } = useContext(AuthContext);

  // Si no hay usuario, muestro botón de login
  if (!user) {
    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeIn" duration={800}>
          <Pressable
            onPress={login}
            disabled={loading}
            style={styles.loginBtn}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.loginText}>Iniciar sesión</Text>
            }
          </Pressable>
        </Animatable.View>
      </View>
    );
  }

  // Si hay usuario, muestro perfil y logout
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={800} style={styles.profile}>
        {user.picture && (
          <Image
            source={{ uri: user.picture }}
            style={styles.avatar}
          />
        )}
        <Text style={styles.name}>¡Hola, {user.name}!</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Pressable onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff'
  },
  profile: {
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24
  },
  logoutBtn: {
    backgroundColor: '#E94864',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600'
  },
  loginBtn: {
    backgroundColor: '#556de8',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
