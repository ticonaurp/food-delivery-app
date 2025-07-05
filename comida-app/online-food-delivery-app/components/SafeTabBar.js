"use client"

import { View, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function SafeTabBar({ children, style }) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 10),
          height: 90 + Math.max(insets.bottom - 5, 0),
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E7",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
})
