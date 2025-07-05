"use client"

import { useContext, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"

const ConfirmAddressScreen = ({ navigation }) => {
  const { loginAsGuest } = useContext(AuthContext)
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmAddress = async () => {
    if (!address.trim()) {
      Alert.alert("Error", "Please enter your delivery address")
      return
    }

    setIsLoading(true)
    try {
      await loginAsGuest(address.trim(), null)
      navigation.replace("MainTabs")
    } catch (error) {
      Alert.alert("Error", "Failed to confirm address. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseCurrentLocation = () => {
    // Simular obtener ubicación actual
    setAddress("Current Location - Detected Address")
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Delivery Address</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={60} color="#E94864" />
        </View>

        <Text style={styles.subtitle}>Where would you like your food delivered?</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="home" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your delivery address"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={2}
          />
        </View>

        <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
          <Ionicons name="locate" size={20} color="#E94864" />
          <Text style={styles.locationButtonText}>Use Current Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.confirmButton, !address.trim() && styles.disabledButton]}
          onPress={handleConfirmAddress}
          disabled={!address.trim() || isLoading}
        >
          <Text style={styles.confirmButtonText}>{isLoading ? "Confirming..." : "Confirm Address"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    minHeight: 40,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginBottom: 32,
  },
  locationButtonText: {
    color: "#E94864",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  confirmButton: {
    backgroundColor: "#E94864",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default ConfirmAddressScreen