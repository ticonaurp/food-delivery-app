// navigation/HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NearMeScreen from '../screens/NearMeScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
<Stack.Navigator initialRouteName="HomeMain">
  <Stack.Screen
    name="Home"  
    component={HomeScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen
    name="NearMeScreen"
    component={NearMeScreen}
    options={{ title: 'Near Me' }}
  />
</Stack.Navigator>


    );
}
