"use client"

import { useEffect } from "react"
import { Alert } from "react-native"

// Componente para BLOQUEAR todos los modals molestos
export default function NoModalWrapper({ children }) {
  useEffect(() => {
    // Interceptar y bloquear todos los Alert.alert
    const originalAlert = Alert.alert

    Alert.alert = (title, message, buttons, options) => {
      // Bloquear alerts relacionados con el carrito
      if (
        title?.toLowerCase().includes("cart") ||
        title?.toLowerCase().includes("carrito") ||
        title?.toLowerCase().includes("added") ||
        title?.toLowerCase().includes("agregado") ||
        message?.toLowerCase().includes("continue") ||
        message?.toLowerCase().includes("shopping") ||
        message?.toLowerCase().includes("view cart")
      ) {
        console.log("🚫 Blocked modal:", title, message)
        return // No mostrar el modal
      }

      // Permitir otros alerts importantes
      return originalAlert(title, message, buttons, options)
    }

    // Cleanup al desmontar
    return () => {
      Alert.alert = originalAlert
    }
  }, [])

  return children
}
