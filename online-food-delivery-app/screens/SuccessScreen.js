"use client"

import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"

const SuccessScreen = ({ navigation }) => {
  const handleGoHome = () => {
    navigation.navigate("MainTabs", { screen: "Inicio" })
  }

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(600)} style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={120} color="#4CAF50" />
        </View>

        <Animated.View entering={FadeInDown.delay(300)} style={styles.textContainer}>
          <Text style={styles.successTitle}>Order Successful!</Text>
          <Text style={styles.successSubtitle}>
            Your order has been placed successfully. You will receive a confirmation shortly.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)} style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={24} color="#E94864" />
            <Text style={styles.infoText}>Estimated delivery: 25-35 minutes</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="location" size={24} color="#E94864" />
            <Text style={styles.infoText}>Delivering to your current address</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="card" size={24} color="#E94864" />
            <Text style={styles.infoText}>Payment completed via wallet</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900)} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.trackButton}>
            <Ionicons name="location" size={20} color="#E94864" />
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.homeButtonText}>Volver al inicio</Text>
          </TouchableOpacity>
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
  successIcon: {
    marginBottom: 40,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 40,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E94864",
  },
  trackButtonText: {
    color: "#E94864",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  homeButton: {
    backgroundColor: "#E94864",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default SuccessScreen