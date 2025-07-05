"use client"

import { useContext, useState } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { TouchableOpacity, StyleSheet, Text, View, Platform, Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HomeScreen from "../screens/HomeScreen"
import OrderScreen from "../screens/OrderScreen"
import ProfileStack from "../navigation/ProfileStack"
import FavoritesScreen from "../screens/FavoritesScreen"
import Ionicons from "@expo/vector-icons/Ionicons"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Feather from "@expo/vector-icons/Feather"
import { CartContext } from "../context/CartContext"
import { useCallback } from "react"

const Tab = createBottomTabNavigator()
const { height: screenHeight } = Dimensions.get("window")

export default function TabLayout() {
  const navigation = useNavigation()
  const cartContext = useContext(CartContext)
  const insets = useSafeAreaInsets()

  const [tabBarHeight, setTabBarHeight] = useState(80)
  const [isAppActive, setIsAppActive] = useState(true)

  const cartItemsCount = cartContext ? cartContext.getTotalItems() : 0

  useFocusEffect(
    useCallback(() => {
      setIsAppActive(true)
      setTabBarHeight(80)

      return () => {
        setIsAppActive(false)
      }
    }, []),
  )

  const safeBottomPadding = Math.min(insets.bottom, 20)

  // ✅ BOTÓN DE CARRITO ARREGLADO
  const CartButton = (props) => (
    <View style={styles.cartButtonContainer}>
      <TouchableOpacity
        {...props}
        style={styles.addButton}
        onPress={() => navigation.navigate("Cart")}
        accessibilityLabel={cartItemsCount > 0 ? `Ir al Carrito (${cartItemsCount} artículos)` : "Ver Carrito"}
        activeOpacity={0.8}
      >
        <Ionicons name={cartItemsCount > 0 ? "bag" : "bag-outline"} size={24} color="#fff" />
        {cartItemsCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItemsCount > 99 ? "99+" : cartItemsCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#E94864",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: tabBarHeight,
          paddingBottom: safeBottomPadding,
          bottom: Math.max(safeBottomPadding + 10, 20),
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarHideOnKeyboard: Platform.OS === "android",
        tabBarAllowFontScaling: false,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color, focused }) => <Feather name="clipboard" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={HomeScreen}
        options={{
          tabBarButton: CartButton,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? "user" : "user-o"} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingTop: 10,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    borderTopWidth: 0,
    borderWidth: 0,
    // ✅ PERMITIR QUE EL BOTÓN SE VEA COMPLETO
    overflow: "visible", // ✅ CAMBIO CLAVE: visible en lugar de hidden
    maxHeight: 100,
    minHeight: 80,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  tabBarItem: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    height: 60,
    flex: 1,
  },
  // ✅ CONTENEDOR PARA EL BOTÓN DE CARRITO
  cartButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // ✅ PERMITIR QUE EL BOTÓN SOBRESALGA
    overflow: "visible",
    zIndex: 10, // ✅ ASEGURAR QUE ESTÉ ENCIMA
  },
  addButton: {
    backgroundColor: "#E94864",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // ✅ POSICIÓN AJUSTADA PARA QUE SE VEA COMPLETO
    marginTop: -30, // ✅ SUBIR EL BOTÓN
    borderColor: "#fff",
    borderWidth: 4,
    elevation: 12,
    shadowColor: "#E94864",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    // ✅ ASEGURAR VISIBILIDAD COMPLETA
    zIndex: 15,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 20, // ✅ BADGE ENCIMA DE TODO
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
})
