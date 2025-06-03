import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import NearMeScreen from "../screens/NearMeScreen";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Stack.Screen name="NearMeScreen" component={NearMeScreen} options={{ title: "Near Me" }} />
      {/* Otros screens */}
    </Stack.Navigator>
  );
}