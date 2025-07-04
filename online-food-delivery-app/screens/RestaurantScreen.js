"use client"

import { useContext, useState } from "react"
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { CartContext } from "../context/CartContext" // ← IMPORTAR CONTEXTO
import { useSafeAreaInsets } from "react-native-safe-area-context"

const RestaurantScreen = ({ route }) => {
  const { restaurant } = route.params
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  // ← USAR CONTEXTO DEL CARRITO
  const { addToCart, cartItems, getTotalItems, canAddItem, clearCart } = useContext(CartContext)

  // ← ESTADO PARA MANEJAR CANTIDADES
  const [selectedItems, setSelectedItems] = useState({})

  // ← FUNCIÓN PARA AGREGAR AL CARRITO
  const handleAddToCart = (menuItem) => {
    try {
      // Verificar si se puede agregar (mismo restaurante)
      if (!canAddItem(restaurant)) {
        Alert.alert(
          "Restaurante diferente",
          "Ya tienes productos de otro restaurante. ¿Quieres limpiar el carrito y agregar este producto?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Sí, limpiar y agregar",
              onPress: () => {
                // Limpiar carrito y agregar nuevo item
                clearCart()
                addToCart(menuItem, restaurant)
                showSuccessMessage(menuItem.name)
              },
            },
          ],
        )
        return
      }

      // Agregar al carrito
      const success = addToCart(menuItem, restaurant)

      if (success) {
        showSuccessMessage(menuItem.name)
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      Alert.alert("Error", "No se pudo agregar el producto al carrito")
    }
  }

  // ← FUNCIÓN PARA MOSTRAR MENSAJE DE ÉXITO
  const showSuccessMessage = (itemName) => {
    Alert.alert("¡Agregado!", `${itemName} se agregó al carrito`, [
      { text: "Seguir comprando", style: "cancel" },
      { text: "Ver carrito", onPress: () => navigation.navigate("Cart") },
    ])
  }

  // ← FUNCIÓN PARA MANEJAR CANTIDADES
  const updateQuantity = (itemId, change) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }))
  }

  // ← FUNCIÓN PARA AGREGAR MÚLTIPLES CANTIDADES
  const addMultipleToCart = (menuItem) => {
    const quantity = selectedItems[menuItem.id] || 1

    for (let i = 0; i < quantity; i++) {
      addToCart(menuItem, restaurant)
    }

    showSuccessMessage(`${quantity}x ${menuItem.name}`)

    // Resetear cantidad
    setSelectedItems((prev) => ({
      ...prev,
      [menuItem.id]: 0,
    }))
  }

  const renderMenuItem = ({ item }) => {
    const quantity = selectedItems[item.id] || 0

    return (
      <View style={styles.menuItem}>
        <View style={styles.menuItemContent}>
          <View style={styles.menuItemInfo}>
            <Text style={styles.menuTitle}>{item.name}</Text>
            <Text style={styles.menuDescription}>{item.description}</Text>
            <Text style={styles.menuPrice}>
              {item.discountPrice ? (
                <>
                  <Text style={styles.originalPrice}>Rp {item.price?.toLocaleString()}</Text>{" "}
                  <Text style={styles.discountPrice}>Rp {item.discountPrice?.toLocaleString()}</Text>
                </>
              ) : (
                `Rp ${item.price?.toLocaleString()}`
              )}
            </Text>
          </View>

          {/* ← IMAGEN DEL PRODUCTO */}
          {item.image && <Image source={{ uri: item.image }} style={styles.menuItemImage} />}
        </View>

        {/* ← CONTROLES DE CANTIDAD Y BOTÓN AGREGAR */}
        <View style={styles.menuItemActions}>
          <View style={styles.quantityControls}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}>
              <Ionicons name="remove" size={20} color="#E94864" />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
              <Ionicons name="add" size={20} color="#E94864" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => (quantity > 0 ? addMultipleToCart(item) : handleAddToCart(item))}
          >
            <Text style={styles.addButtonText}>{quantity > 0 ? `Agregar ${quantity}` : "Agregar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* ← HEADER CON BOTÓN DE REGRESO */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Menú</Text>

        {/* ← BOTÓN DE CARRITO CON BADGE */}
        {getTotalItems() > 0 && (
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
            <Ionicons name="bag" size={24} color="#E94864" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Image source={{ uri: restaurant.image }} style={styles.image} />

      {/* ← INFORMACIÓN DEL RESTAURANTE */}
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantType}>{restaurant.type}</Text>

        <View style={styles.restaurantStats}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.statText}>{restaurant.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={16} color="#8E8E93" />
            <Text style={styles.statText}>{restaurant.deliveryTime}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="location" size={16} color="#8E8E93" />
            <Text style={styles.statText}>{restaurant.distance}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={restaurant.menu || restaurant.popularDishes || []}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, { paddingBottom: 90 + Math.max(insets.bottom, 10) }]}
        showsVerticalScrollIndicator={false}
      />

      {/* ← BOTÓN FLOTANTE PARA IR AL CARRITO */}
      {getTotalItems() > 0 && (
        <TouchableOpacity
          style={[styles.floatingCartButton, { bottom: 90 + Math.max(insets.bottom, 10) }]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="bag" size={20} color="#FFFFFF" />
          <Text style={styles.floatingCartText}>Ver carrito ({getTotalItems()})</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

export default RestaurantScreen

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
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  cartButton: {
    padding: 8,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#E94864",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#F2F2F7",
  },
  restaurantInfo: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  restaurantType: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 12,
  },
  restaurantStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 4,
  },
  listContainer: {
    padding: 16,
  },
  menuItem: {
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
  menuItemContent: {
    flexDirection: "row",
    marginBottom: 12,
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    marginBottom: 8,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#8E8E93",
    fontSize: 14,
  },
  discountPrice: {
    color: "#E94864",
    fontWeight: "600",
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F2F2F7",
  },
  menuItemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    color: "#1D1D1F",
  },
  addButton: {
    backgroundColor: "#E94864",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  floatingCartButton: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "#E94864",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})
