"use client"

import { useContext, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { CartContext } from "../context/CartContext"
import StatusBarConfig from "../components/StatusBarConfig"

const { width } = Dimensions.get("window")

export default function CartScreen() {
  const navigation = useNavigation()
  const {
    cartItems,
    selectedRestaurant,
    getSubtotal,
    getTotal,
    getTotalItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    deliveryFee,
  } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrito vacío", "Agrega algunos productos antes de proceder al checkout.")
      return
    }
    navigation.navigate("Checkout")
  }

  const handleClearCart = () => {
    Alert.alert("Limpiar carrito", "¿Estás seguro de que quieres eliminar todos los productos?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Limpiar", style: "destructive", onPress: clearCart },
    ])
  }

  // CATEGORÍAS MEJORADAS - Usando tu sistema de filtros existente
  const exploreCategories = [
    {
      id: 1,
      label: "Cerca de ti",
      subtitle: "Restaurantes cercanos",
      icon: <FontAwesome6 name="map-location-dot" size={24} color="#FF6B35" />,
      color: "#FF6B35",
      route: "NearMeScreen",
      // No necesita filterType porque va directo a NearMeScreen
    },
    {
      id: 2,
      label: "Popular",
      subtitle: "Los más pedidos",
      icon: <FontAwesome5 name="award" size={24} color="#4ECDC4" />,
      color: "#4ECDC4",
      route: "FilteredPlatos",
      filterType: "popular",
    },
    {
      id: 3,
      label: "Descuentos",
      subtitle: "Ofertas especiales",
      icon: <MaterialIcons name="discount" size={24} color="#45B7D1" />,
      color: "#45B7D1",
      route: "FilteredPlatos",
      filterType: "descuento",
    },
    {
      id: 4,
      label: "24 Horas",
      subtitle: "Disponible todo el día",
      icon: <MaterialCommunityIcons name="hours-24" size={24} color="#96CEB4" />,
      color: "#96CEB4",
      route: "FilteredPlatos",
      filterType: "todoElDia",
    },
    {
      id: 5,
      label: "Entrega Rápida",
      subtitle: "En menos de 30 min",
      icon: <MaterialIcons name="delivery-dining" size={24} color="#FFD93D" />,
      color: "#FFD93D",
      route: "FilteredPlatos",
      filterType: "entregaRapida",
    },
  ]

  // Función para manejar la navegación con parámetros
  const handleCategoryPress = (category) => {
    if (category.filterType) {
      // Navegar a FilteredPlatos con el filterType correspondiente
      navigation.navigate(category.route, {
        filterType: category.filterType,
        title: category.label, // Título para mostrar en la pantalla
      })
    } else {
      // Navegación simple (como NearMeScreen)
      navigation.navigate(category.route)
    }
  }

  // Si el carrito está vacío - PANTALLA MEJORADA CON TU SISTEMA DE FILTROS
  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBarConfig barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.title}>Mi Carrito</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.emptyContainer} showsVerticalScrollIndicator={false}>
          {/* Ilustración principal */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationCircle}>
              <Ionicons name="restaurant" size={60} color="#E94864" />
            </View>
            <Text style={styles.emptyTitle}>¡Tu carrito está esperando!</Text>
            <Text style={styles.emptySubtitle}>Descubre deliciosos platos de los mejores restaurantes cerca de ti</Text>
          </View>

          {/* Categorías para explorar - USANDO TU SISTEMA */}
          <View style={styles.categoriesSection}>
            <Text style={styles.categoriesTitle}>¿Qué te apetece hoy?</Text>
            <View style={styles.categoriesGrid}>
              {exploreCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryCard, { borderLeftColor: category.color }]}
                  onPress={() => handleCategoryPress(category)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + "20" }]}>{category.icon}</View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle}>{category.label}</Text>
                    <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botón principal */}
          <View style={styles.mainActionContainer}>
            <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate("NearMeScreen")}>
              <Ionicons name="compass" size={20} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.exploreButtonText}>Explorar Restaurantes</Text>
            </TouchableOpacity>
          </View>

          {/* Beneficios */}
          <View style={styles.benefitsSection}>
            <View style={styles.benefitItem}>
              <Ionicons name="time" size={20} color="#4ECDC4" />
              <Text style={styles.benefitText}>Entrega rápida</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="shield-checkmark" size={20} color="#96CEB4" />
              <Text style={styles.benefitText}>Pago seguro</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="star" size={20} color="#FFD93D" />
              <Text style={styles.benefitText}>Calidad garantizada</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarConfig barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
        </TouchableOpacity>
        <Text style={styles.title}>Mi Carrito</Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={20} color="#E94864" />
        </TouchableOpacity>
      </View>

      {selectedRestaurant && (
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{selectedRestaurant.name}</Text>
          <Text style={styles.itemCount}>{getTotalItems()} artículos</Text>
        </View>
      )}

      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image || "/placeholder.svg?height=60&width=60" }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                ${(item.discountPrice || item.originalPrice || item.price || 0).toFixed(2)}
              </Text>
              {item.description && (
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              )}
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Ionicons name="remove" size={20} color="#E94864" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#E94864" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${getSubtotal().toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío:</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, isLoading && styles.checkoutButtonDisabled]}
          onPress={handleCheckout}
          disabled={isLoading}
        >
          <Text style={styles.checkoutText}>{isLoading ? "Procesando..." : "Proceder al Pago"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
    content: {
    flex: 1,
    paddingBottom: 100, // ← ESPACIO PARA LA TAB BAR
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D1D1F",
  },
  clearButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  restaurantInfo: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: "#8E8E93",
  },
  // ESTILOS PARA CARRITO VACÍO
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E94864" + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  categoriesSection: {
    marginBottom: 32,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 16,
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: "#8E8E93",
  },
  mainActionContainer: {
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: "#E94864",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E94864",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  benefitsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
    marginBottom: 20,
  },
  benefitItem: {
    alignItems: "center",
    flex: 1,
  },
  benefitText: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 8,
    textAlign: "center",
  },
  // ESTILOS PARA CARRITO CON PRODUCTOS
  itemsList: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#F2F2F7",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#E94864",
    fontWeight: "500",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: "#8E8E93",
    lineHeight: 16,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    color: "#1D1D1F",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E7",
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#8E8E93",
  },
  summaryValue: {
    fontSize: 16,
    color: "#1D1D1F",
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E7",
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E94864",
  },
  checkoutButton: {
    backgroundColor: "#E94864",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutButtonDisabled: {
    backgroundColor: "#8E8E93",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
})
