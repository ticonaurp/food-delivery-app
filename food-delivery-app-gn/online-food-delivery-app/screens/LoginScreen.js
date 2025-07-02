// src/screens/LoginScreen.js
import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import {
  useAuthRequest,
  ResponseType,
  makeRedirectUri,
} from 'expo-auth-session';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigation.replace('MainTabs');
  }, [user]);

  const redirectUri = makeRedirectUri({ useProxy: true });
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'TU_CLIENT_ID_DE_GOOGLE',
      responseType: ResponseType.IdToken,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      login(response);
      navigation.replace('MainTabs');
    }
  }, [response]);

  return (
    <View style={styles.screen}>
      {/* StatusBar traslúcido sin backgroundColor */}
      <RNStatusBar
  backgroundColor="#E94864"
  barStyle="light-content"
  translucent={false}
/>

      {/* Vista bajo la StatusBar para simular su color */}
      <View style={styles.statusBarBackground} />

      <ImageBackground
        source={require('../assets/bg-food.jpg')}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.container}>
          <Pressable
            style={styles.skipBtn}
            onPress={() => navigation.navigate('ConfirmAddress')}
          >
            <Text style={styles.skipText}>Ahora no</Text>
          </Pressable>

          <View style={styles.header}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Elige cómo ingresar</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.btnSocial, styles.btnGoogleBorder]}
              disabled={!request}
              onPress={() => promptAsync({ useProxy: true })}
            >
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text style={[styles.btnSocialText, { color: '#DB4437' }]}>
                Continuar con Google
              </Text>
            </Pressable>

            <Pressable
              style={[styles.btnSocial, styles.btnFacebookBorder]}
              onPress={() => navigation.replace('MainTabs')}
            >
              <FontAwesome name="facebook" size={20} color="#1877F2" />
              <Text style={[styles.btnSocialText, { color: '#1877F2' }]}>
                Continuar con Facebook
              </Text>
            </Pressable>

            <Pressable
              style={[styles.btnSocial, styles.btnOtherBorder]}
              onPress={() => navigation.navigate('EmailLoginScreen')}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#444" />
              <Text style={[styles.btnSocialText, { color: '#444' }]}>
                Otro método
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const STATUS_BAR_HEIGHT = RNStatusBar.currentHeight || 24;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    backgroundColor: '#E94864',
  },
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  skipBtn: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  skipText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  header: {
    alignItems: 'center',
    marginTop: 16,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 8,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  btnSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'center',
  },
  btnSocialText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  btnGoogleBorder: {
    borderWidth: 1,
    borderColor: '#DB4437',
  },
  btnFacebookBorder: {
    borderWidth: 1,
    borderColor: '#1877F2',
  },
  btnOtherBorder: {
    borderWidth: 1,
    borderColor: '#CCC',
  },
});
