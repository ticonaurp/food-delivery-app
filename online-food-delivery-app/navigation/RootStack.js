"use client";

import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import ConfirmAddressScreen from "../screens/ConfirmAddressScreen";
import TabLayout from "./TabLayout";
import DetailRestoran from "../screens/DetailRestoran";
import NearMeScreen from "../screens/NearMeScreen";
import PopularScreen from "../screens/PopularScreen";
// import DiscountScreen from "../screens/DiscountScreen"
import AllDayScreen from "../screens/AllDayScreen";
import QuickDeliveryScreen from "../screens/QuickDeliveryScreen";
import FilteredPlatosScreen from "../screens/FilteredPlatosScreen";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import SuccessScreen from "../screens/SuccessScreen";
import OrderLoadingScreen from "../screens/OrderLoadingScreen";
import RestaurantScreen from "../screens/RestaurantScreen";

import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import OrderTrackingScreen from "../screens/OrderTrackingScreen";
import ProfileScreen from "../screens/ProfileScreen";

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
            options={{
              headerShown: true,
              title: "Restaurant Detail",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />

          <Stack.Screen
            name="RestaurantDetail"
            component={RestaurantDetailScreen}
            options={{
              headerShown: false, // Usamos header personalizado
              presentation: "card",
            }}
          />

          <Stack.Screen
            name="NearMeScreen"
            component={NearMeScreen}
            options={{
              headerShown: false, // Usamos header personalizado
              presentation: "card",
            }}
          />
          {/* 
          <Stack.Screen
            name="PopularScreen"
            component={PopularScreen}
            options={{
              headerShown: true,
              title: "Popular",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
            }}
          /> */}

          {/* <Stack.Screen
            name="DiscountScreen"
            component={DiscountScreen}
            options={{
              headerShown: true,
              title: "Discount",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
            }}
          /> */}

          <Stack.Screen
            name="AllDayScreen"
            component={AllDayScreen}
            options={{
              headerShown: true,
              title: "24 Hours",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
            }}
          />

          {/* <Stack.Screen
            name="QuickDeliveryScreen"
            component={QuickDeliveryScreen}
            options={{
              headerShown: true,
              title: "Quick Delivery",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
            }}
          /> */}

          <Stack.Screen
            name="FilteredPlatos"
            component={FilteredPlatosScreen}
            options={{
              headerShown: true,
              title: "Platos Filtrados",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
            }}
          />

          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              headerShown: true,
              title: "Search",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
            }}
          />

          <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />

          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerShown: true,
              title: "Shopping Cart",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />

          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{
              headerShown: true,
              title: "Checkout",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
              headerTitleStyle: { fontWeight: "bold" },
              headerShown: false, // Usamos nuestro header personalizado
            }}
          />

          <Stack.Screen
            name="OrderLoading"
            component={OrderLoadingScreen}
            options={{
              headerShown: false,
              gestureEnabled: false, // No permitir swipe back durante loading
            }}
          />

          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="OrderTracking"
            component={OrderTrackingScreen}
            options={{
              headerShown: true,
              title: "Track Order",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />

          {/* Nuevas pantallas de funcionalidades */}
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              headerShown: true,
              title: "Favorite Restaurants",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />

          <Stack.Screen
            name="OrderHistory"
            component={OrderHistoryScreen}
            options={{
              headerShown: true,
              title: "Order History",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: true,
              title: "Profile",
              headerStyle: { backgroundColor: "#f8f9fa" },
              headerTintColor: "#333",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
