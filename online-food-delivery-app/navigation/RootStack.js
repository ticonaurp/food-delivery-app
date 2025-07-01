// src/navigation/RootStack.js
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import ConfirmAddressScreen from "../screens/ConfirmAddressScreen";
import TabLayout from "./TabLayout";
import DetailRestoran from "../screens/DetailRestoran";
import NearMeScreen from "../screens/NearMeScreen";
import PopularScreen from "../screens/PopularScreen";
import DiscountScreen from "../screens/DiscountScreen";
import AllDayScreen from "../screens/AllDayScreen";
import QuickDeliveryScreen from "../screens/QuickDeliveryScreen";
import FilteredPlatosScreen from "../screens/FilteredPlatosScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

export default function RootStack() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} 
          />

          <Stack.Screen
            name="ConfirmAddress"
            component={ConfirmAddressScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="MainTabs" component={TabLayout} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={TabLayout} />

          <Stack.Screen
            name="DetailRestoran"
            component={DetailRestoran}
            options={{ headerShown: true, title: "Restaurant Detail" }}
          />

          <Stack.Screen
            name="NearMeScreen"
            component={NearMeScreen}
            options={{ headerShown: true, title: "Near Me" }}
          />

          <Stack.Screen
            name="PopularScreen"
            component={PopularScreen}
            options={{ headerShown: true, title: "Popular" }}
          />

          <Stack.Screen
            name="DiscountScreen"
            component={DiscountScreen}
            options={{ headerShown: true, title: "Discount" }}
          />

          <Stack.Screen
            name="AllDayScreen"
            component={AllDayScreen}
            options={{ headerShown: true, title: "24 Hours" }}
          />

          <Stack.Screen
            name="QuickDeliveryScreen"
            component={QuickDeliveryScreen}
            options={{ headerShown: true, title: "Quick Delivery" }}
          />

          <Stack.Screen
            name="FilteredPlatos"
            component={FilteredPlatosScreen}
            options={{ headerShown: true, title: "Platos Filtrados" }}
          />

          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ headerShown: true }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
