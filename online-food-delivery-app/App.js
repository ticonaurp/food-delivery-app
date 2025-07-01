// App.js
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';  // ← Import necesario
import RootStack from './navigation/RootStack';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  console.log('¿Hermes está activo?', !!global.HermesInternal);

  // Pintar la barra de navegación de Android
useEffect(() => {
  NavigationBar.setBackgroundColorAsync('#E94864');
  NavigationBar.setButtonStyleAsync('light');
}, []);


  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
