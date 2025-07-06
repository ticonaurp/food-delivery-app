"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"

const OrderLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Success")
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(600)} style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="restaurant" size={80} color="#E94864" />
        </View>

        <Animated.View entering={FadeInDown.delay(300)} style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E94864" />
          <Text style={styles.loadingText}>Processing your order...</Text>
          <Text style={styles.subText}>Please wait while we prepare your delicious meal</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)} style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={[styles.stepCircle, styles.activeStep]}>
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text style={styles.stepText}>Order Confirmed</Text>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.step}>
            <View style={[styles.stepCircle, styles.activeStep]}>
              <ActivityIndicator size="small" color="white" />
            </View>
            <Text style={styles.stepText}>Preparing Food</Text>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.step}>
            <View style={styles.stepCircle}>
              <Ionicons name="bicycle" size={16} color="#ccc" />
            </View>
            <Text style={[styles.stepText, { color: "#ccc" }]}>On the Way</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
  },
  stepsContainer: {
    alignItems: "center",
  },
  step: {
    alignItems: "center",
    marginVertical: 8,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: "#E94864",
  },
  stepText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  stepLine: {
    width: 2,
    height: 20,
    backgroundColor: "#E94864",
    marginVertical: 4,
  },
})

export default OrderLoadingScreen
