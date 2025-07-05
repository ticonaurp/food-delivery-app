"use client"

import { useContext } from "react"
import { CartContext } from "../context/CartContext"

// Hook personalizado para manejar acciones del carrito SIN MODALS
export const useCartActions = () => {
  const { addToCart, canAddItem, selectedRestaurant, clearCart } = useContext(CartContext)

  const addToCartSilently = (item, restaurant) => {
    try {
      // Verificar si se puede agregar (mismo restaurante)
      if (!canAddItem(restaurant)) {
        // Si hay conflicto de restaurante, simplemente limpiar y agregar
        console.log("🔄 Different restaurant, clearing cart and adding new item")
        clearCart()
      }

      // Agregar al carrito SIN NINGÚN MODAL O ALERT
      const success = addToCart(item, restaurant)

      // Solo log silencioso para debugging
      console.log("✅ Item added silently:", item.name)

      return success
    } catch (error) {
      console.error("❌ Error adding to cart:", error)
      return false
    }
  }

  return {
    addToCartSilently,
    canAddItem,
    selectedRestaurant,
  }
}
