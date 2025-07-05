"use client"

import { useEffect, useRef } from "react"
import { AppState, Dimensions } from "react-native"

export const useAppStateHandler = (onForeground, onBackground) => {
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log("📱 App state changed:", appState.current, "->", nextAppState)

      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // ✅ App regresó al foreground - RESETEAR TODO
        console.log("🔄 App volvió al foreground - reseteando UI")
        onForeground?.()

        // ✅ FORZAR RECÁLCULO DE DIMENSIONES
        setTimeout(() => {
          const { height, width } = Dimensions.get("window")
          console.log("📐 Dimensiones actuales:", { height, width })
        }, 100)
      } else if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
        // App fue al background
        console.log("📱 App fue al background")
        onBackground?.()
      }

      appState.current = nextAppState
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange)

    return () => subscription?.remove()
  }, [onForeground, onBackground])

  return appState.current
}
