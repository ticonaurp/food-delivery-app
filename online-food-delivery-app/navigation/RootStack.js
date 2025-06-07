// navigation/RootStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabLayout from './TabLayout';
import NearMeScreen from '../screens/NearMeScreen';
import DetailRestoran from '../screens/DetailRestoran'; // <-- AGREGA ESTO

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NearMeScreen"
        component={NearMeScreen}
        options={{ title: "Near Me" }}
      />
      <Stack.Screen
        name="DetailRestoran"
        component={DetailRestoran}
        options={{ title: "Restaurant Detail" }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
