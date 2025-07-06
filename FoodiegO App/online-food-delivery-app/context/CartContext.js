"use client"

import { createContext, useState, useContext, useCallback } from "react"
import { AuthContext } from "./AuthContext"

export const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [deliveryAddress, setDeliveryAddress] = useState(null)
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  // Verificar que AuthContext existe antes de usarlo
  const authContext = useContext(AuthContext)
  const { user, updateWalletAfterPurchase, useCoinsAsDiscount, earnCoins, addToOrderHistory } = authContext || {}

  // FUNCIÓN COMPLETAMENTE SILENCIOSA - SIN NINGÚN MODAL O ALERT
  const addToCart = useCallback(
    (item, restaurant = null) => {
      try {
        console.log("🛒 Adding to cart silently:", item.name)

        // Si es el primer item, establecer el restaurante
        if (cartItems.length === 0 && restaurant) {
          setSelectedRestaurant(restaurant)
          console.log("🏪 Set restaurant:", restaurant.name)
        }

        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id)

        if (existingItemIndex >= 0) {
          // Si el item ya existe, incrementar cantidad
          const updatedCartItems = [...cartItems]
          updatedCartItems[existingItemIndex].quantity += 1
          setCartItems(updatedCartItems)
          console.log("➕ Updated quantity for:", item.name)
        } else {
          // Agregar nuevo item
          const newItem = {
            ...item,
            quantity: 1,
            restaurantId: restaurant?.id || selectedRestaurant?.id,
            // Asegurar que tenemos un precio
            price: item.discountPrice || item.originalPrice || item.price || 0,
          }
          setCartItems((prevCartItems) => [...prevCartItems, newItem])
          console.log("✅ Added new item:", newItem.name)
        }

        // ❌ ABSOLUTAMENTE NINGÚN MODAL, ALERT O POPUP
        // ❌ NO "Added to cart"
        // ❌ NO "Continue shopping"
        // ❌ NO "View cart"
        // ❌ NO interrupciones de ningún tipo
        // ✅ Solo operación silenciosa

        return true
      } catch (error) {
        console.error("❌ Error in addToCart:", error)
        return false
      }
    },
    [cartItems, selectedRestaurant],
  )

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => item.id !== itemId)
      if (updatedCartItems.length === 0) {
        setSelectedRestaurant(null)
        setDeliveryFee(0)
      }
      return updatedCartItems
    })
  }, [])

  const updateQuantity = useCallback(
    (itemId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(itemId)
        return
      }
      setCartItems((prevCartItems) => prevCartItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCartItems([])
    setSelectedRestaurant(null)
    setDeliveryAddress(null)
    setDeliveryFee(0)
    console.log("🗑️ Cart cleared")
  }, [])

  const getSubtotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.originalPrice || item.price || 0
      return total + price * item.quantity
    }, 0)
  }, [cartItems])

  const getTotal = useCallback(() => {
    return getSubtotal() + deliveryFee
  }, [getSubtotal, deliveryFee])

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const processOrder = useCallback(
    async (paymentMethod = "wallet", coinsUsed = 0) => {
      const total = getTotal()
      let finalAmount = total
      const coinsUsedSuccessfully = coinsUsed > 0 && authContext ? await useCoinsAsDiscount(coinsUsed) : true
      const paymentSuccessful = paymentMethod === "wallet" ? await updateWalletAfterPurchase(finalAmount) : true

      if (coinsUsed > 0 && !coinsUsedSuccessfully) {
        throw new Error("No tienes suficientes coins")
      }

      if (!authContext) {
        throw new Error("Auth context not available")
      }

      if (coinsUsed > 0) {
        const coinsDiscount = coinsUsed * 1000
        finalAmount = Math.max(0, total - coinsDiscount)
      }

      if (paymentMethod === "wallet" && !paymentSuccessful) {
        throw new Error("Fondos insuficientes en wallet")
      }

      const order = {
        items: cartItems,
        restaurant: selectedRestaurant,
        subtotal: getSubtotal(),
        deliveryFee,
        total,
        finalAmount,
        coinsUsed,
        paymentMethod,
        deliveryAddress,
        estimatedDelivery: "25-35 min",
      }

      const orderId = await addToOrderHistory(order)
      const coinsEarned = Math.floor(finalAmount / 10000)
      if (coinsEarned > 0) {
        await earnCoins(coinsEarned)
      }

      clearCart()
      return { orderId, coinsEarned }
    },
    [
      cartItems,
      selectedRestaurant,
      deliveryFee,
      getSubtotal,
      getTotal,
      clearCart,
      useCoinsAsDiscount,
      updateWalletAfterPurchase,
      addToOrderHistory,
      earnCoins,
    ],
  )

  const canAddItem = useCallback(
    (restaurant) => {
      if (cartItems.length === 0) return true
      return selectedRestaurant?.id === restaurant?.id
    },
    [cartItems.length, selectedRestaurant?.id],
  )

  const setDeliveryFeeCallback = useCallback((fee) => {
    setDeliveryFee(fee)
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedRestaurant,
        deliveryAddress,
        deliveryFee,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        getTotal,
        getTotalItems,
        processOrder,
        canAddItem,
        setDeliveryAddress,
        setDeliveryFee: setDeliveryFeeCallback,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
