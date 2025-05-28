import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './path/to/HomeScreen'; // Ajusta la ruta

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // <-- Aquí ocultas el header
        />
        {/* Otras pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}