"use client"

import { StatusBar, Platform } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"

// ✅ CONFIGURACIÓN PARA BARRA DE ESTADO TRANSPARENTE
export default function StatusBarConfig({
  barStyle = "light-content", // ✅ Texto blanco para fondos oscuros
  backgroundColor = "transparent", // ✅ Fondo transparente
  translucent = true, // ✅ Translúcido
}) {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === "android") {
        StatusBar.setBarStyle(barStyle, true)
        StatusBar.setBackgroundColor(backgroundColor, true)
        StatusBar.setTranslucent(translucent)
        StatusBar.setHidden(false, "fade")
      }
    }, [barStyle, backgroundColor, translucent]),
  )

  return <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} translucent={translucent} hidden={false} />
}
