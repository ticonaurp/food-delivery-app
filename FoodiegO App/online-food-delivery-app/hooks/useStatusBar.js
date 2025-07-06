"use client"

import { useEffect } from "react"
import { StatusBar, Platform } from "react-native"

export const useStatusBar = (style = "dark-content", backgroundColor = "#FFFFFF") => {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBarStyle(style, true)
      StatusBar.setBackgroundColor(backgroundColor, true)
      StatusBar.setTranslucent(false)
      StatusBar.setHidden(false)
    }
  }, [style, backgroundColor])
}


