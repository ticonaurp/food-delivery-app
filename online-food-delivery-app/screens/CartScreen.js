"use client"
import { useContext, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { CartContext } from "../context/CartContext"
import StatusBarConfig from "../components/StatusBarConfig"

export default function CartScreen() {
  const navigation = useNavigation()
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)

  // Función para calcular el total si getTotalPrice no está disponible
  const calculateTotal = () => {
    if (getTotalPrice && typeof getTotalPrice === "function") {
      try {
        return getTotalPrice()
      } catch (error) {
        console.error("Error calling getTotalPrice:", error)
      }
    }

    // Fallback: calcular manualmente
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.originalPrice || item.price || 0
      const quantity = item.quantity || 1
      return total + price * quantity
    }, 0)
  }

  // Función para generar key única para cada item
  const getItemKey = (item, index) => {
    return item.uniqueId || item.id || `cart-item-${index}`
  }

  // 🔥 FUNCIÓN PARA ELIMINAR PRODUCTO INDIVIDUAL
  const handleRemoveItem = (itemId) => {
    Alert.alert("Eliminar producto", "¿Estás seguro de que quieres eliminar este producto del carrito?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          console.log("🗑️ Removing item:", itemId)
          if (removeFromCart && typeof removeFromCart === "function") {
            removeFromCart(itemId)
          }
        },
      },
    ])
  }

  const handleClearCart = () => {
    Alert.alert("Vaciar carrito", "¿Estás seguro de que quieres eliminar todos los productos?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Vaciar",
        style: "destructive",
        onPress: () => {
          if (clearCart && typeof clearCart === "function") {
            clearCart()
          }
        },
      },
    ])
  }

  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      Alert.alert("Carrito vacío", "Agrega algunos productos antes de continuar.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigation.navigate("CheckoutScreen")
    }, 1000)
  }

  const formatPrice = (price) => {
    const numPrice = Number(price) || 0
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    }).format(numPrice)
  }

  // Validar que cartItems existe y es un array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : []

  if (safeCartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBarConfig barStyle="dark-content" backgroundColor="#FFFFFF" />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Carrito</Text>
          <View style={styles.placeholder} />
        </View>
        {/* Estado vacío */}
        <View style={styles.emptyContainer}>
          <Ionicons name="bag-outline" size={80} color="#E5E5E7" />
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptySubtitle}>Explora nuestros restaurantes y agrega algunos platos deliciosos</Text>
          <TouchableOpacity
  style={styles.exploreButton}
  onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
>
  <Text>Ir al Home</Text>
</TouchableOpacity>

        </View>
      </SafeAreaView>
    )
  }

  const totalPrice = calculateTotal()

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBarConfig barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Carrito ({safeCartItems.length})</Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={20} color="#E94864" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Items del carrito */}
        <View style={styles.itemsContainer}>
          {safeCartItems.map((item, index) => {
            // Validar que el item existe
            if (!item) return null

            const itemKey = getItemKey(item, index)
            const itemPrice = item.discountPrice || item.originalPrice || item.price || 0
            const itemQuantity = item.quantity || 1

            return (
              <View key={itemKey} style={styles.cartItem}>
                <Image
                  source={{ uri: item.image || "https://via.placeholder.com/80x80/E94864/FFFFFF?text=No+Image" }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name || "Producto sin nombre"}</Text>
                  <Text style={styles.restaurantName}>{item.restaurant?.name || "Restaurante"}</Text>
                  <View style={styles.priceContainer}>
                    {item.hasDiscount && item.originalPrice && (
                      <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
                    )}
                    <Text style={styles.currentPrice}>{formatPrice(itemPrice)}</Text>
                  </View>
                </View>
                {/* Controles de cantidad y eliminar */}
                <View style={styles.itemControls}>
                  {/* Botón eliminar individual */}
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.uniqueId || item.id)}
                    style={styles.removeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close-circle" size={24} color="#FF4444" />
                  </TouchableOpacity>
                  {/* Controles de cantidad */}
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      onPress={() => {
                        if (updateQuantity && typeof updateQuantity === "function") {
                          const newQuantity = Math.max(1, itemQuantity - 1)
                          updateQuantity(item.uniqueId || item.id, newQuantity)
                        }
                      }}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="remove" size={16} color="#E94864" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{itemQuantity}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (updateQuantity && typeof updateQuantity === "function") {
                          updateQuantity(item.uniqueId || item.id, itemQuantity + 1)
                        }
                      }}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="add" size={16} color="#E94864" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        {/* Resumen del pedido */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Resumen del Pedido</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(totalPrice)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>Gratis</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botón de checkout */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={[styles.checkoutButton, isLoading && styles.checkoutButtonDisabled]}
          onPress={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.checkoutButtonText}>Proceder al Pago</Text>
              <Text style={styles.checkoutPrice}>{formatPrice(totalPrice)}</Text>
            </>
          )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D1D1F",
  },
  clearButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  itemsContainer: {
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: "#F2F2F7",
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#8E8E93",
    textDecorationLine: "line-through",
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E94864",
  },
  itemControls: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  removeButton: {
    padding: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: "center",
  },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#8E8E93",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#E5E5E7",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D1D1F",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E94864",
  },
  checkoutContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E7",
  },
  checkoutButton: {
    backgroundColor: "#E94864",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  checkoutPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginTop: 24,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: "#E94864",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
})
