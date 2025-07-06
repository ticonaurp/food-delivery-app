"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useCartActions } from "../hooks/useCartActions"

// Componente de producto SIN MODALS MOLESTOS
export default function ProductCard({ item, restaurant, style }) {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCartSilently } = useCartActions()

  const handleAddToCart = async () => {
    if (isAdding) return // Prevenir doble tap

    setIsAdding(true)

    // Agregar al carrito SILENCIOSAMENTE
    const success = addToCartSilently(item, restaurant)

    // Pequeña animación visual (opcional)
    setTimeout(() => {
      setIsAdding(false)
    }, 300)

    // ❌ NO MODALS
    // ❌ NO ALERTS
    // ❌ NO "Continue Shopping"
    // ❌ NO "View Cart"
    // ✅ Solo feedback visual sutil
  }

  return (
    <View style={[styles.card, style]}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            {item.hasDiscount ? (
              <>
                <Text style={styles.originalPrice}>Rp {item.originalPrice?.toLocaleString()}</Text>
                <Text style={styles.discountPrice}>Rp {item.discountPrice?.toLocaleString()}</Text>
              </>
            ) : (
              <Text style={styles.price}>Rp {(item.price || item.originalPrice)?.toLocaleString()}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.addButton, isAdding && styles.addButtonActive]}
            onPress={handleAddToCart}
            disabled={isAdding}
            activeOpacity={0.7}
          >
            {isAdding ? (
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            ) : (
              <Ionicons name="add" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#F2F2F7",
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  originalPrice: {
    fontSize: 14,
    color: "#8E8E93",
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  addButton: {
    backgroundColor: "#E94864",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonActive: {
    backgroundColor: "#4CAF50",
  },
})
