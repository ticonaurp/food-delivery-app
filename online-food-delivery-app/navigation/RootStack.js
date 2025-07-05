"use client"

import { useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { AuthContext } from "../context/AuthContext"
import LoginScreen from "../screens/LoginScreen"
import ConfirmAddressScreen from "../screens/ConfirmAddressScreen"
import TabLayout from "./TabLayout"
import DetailRestoran from "../screens/DetailRestoran"
import NearMeScreen from "../screens/NearMeScreen"
import FilteredPlatosScreen from "../screens/FilteredPlatosScreen"
import SearchScreen from "../screens/SearchScreen"
import CartScreen from "../screens/CartScreen"
import CheckoutScreen from "../screens/CheckoutScreen"
import SuccessScreen from "../screens/SuccessScreen"
import OrderLoadingScreen from "../screens/OrderLoadingScreen"
import RestaurantScreen from "../screens/RestaurantScreen"
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import OrderHistoryScreen from "../screens/OrderHistoryScreen"
import OrderTrackingScreen from "../screens/OrderTrackingScreen"
import ProfileScreen from "../screens/ProfileScreen"
import NotificationsScreen from "../screens/NotificationsScreen"

const Stack = createStackNavigator()

export default function RootStack() {
  const authContext = useContext(AuthContext)
  const user = authContext?.user

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // ✅ PANTALLAS SIN AUTENTICACIÓN
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ConfirmAddress" component={ConfirmAddressScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainTabs" component={TabLayout} />
        </>
      ) : (
        // ✅ PANTALLAS CON AUTENTICACIÓN
        <>
          {/* Tab Navigator Principal */}
          <Stack.Screen name="MainTabs" component={TabLayout} />

          {/* ✅ PANTALLAS DE RESTAURANTES */}
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
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />

          {/* ✅ PANTALLAS DE NAVEGACIÓN Y FILTROS */}
          <Stack.Screen
            name="NearMeScreen"
            component={NearMeScreen}
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />

          <Stack.Screen
            name="FilteredPlatos"
            component={FilteredPlatosScreen}
            options={{
              headerShown: false, // Usa header personalizado
              presentation: "card",
            }}
          />

          {/* ✅ BÚSQUEDA Y FAVORITOS */}
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="FavoritesScreen"
            component={FavoritesScreen}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />


          {/* ✅ CARRITO Y CHECKOUT */}
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerShown: false, // Usa header personalizado
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />

          {/* ✅ PROCESO DE PEDIDO */}
          <Stack.Screen
            name="OrderLoading"
            component={OrderLoadingScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
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

          {/* ✅ HISTORIAL Y PERFIL */}
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

          {/* ✅ NOTIFICACIONES */}
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}