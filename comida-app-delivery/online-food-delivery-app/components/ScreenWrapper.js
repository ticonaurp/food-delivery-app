"use client"

import { View, StyleSheet } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

export default function ScreenWrapper({ children, style, includeTabBarPadding = true, edges = ["top"] }) {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      <View
        style={[
          styles.content,
          includeTabBarPadding && {
            paddingBottom: 90 + Math.max(insets.bottom, 10),
          },
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
  },
})
