"use client"

import { useEffect, useRef } from "react"
import { AppState } from "react-native"

export const useAppState = (onForeground, onBackground) => {
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // App volvió al foreground
        onForeground?.()
      } else if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
        // App fue al background
        onBackground?.()
      }

      appState.current = nextAppState
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange)

    return () => subscription?.remove()
  }, [onForeground, onBackground])

  return appState.current
}
