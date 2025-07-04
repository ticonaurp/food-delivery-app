"use client"

import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"

const LoginScreen = ({ navigation }) => {
  const { login, loginAsGuest } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await login()
    } catch (error) {
      Alert.alert("Error", "Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setIsLoading(true)
    try {
      await loginAsGuest("Default Address", null)
      navigation.replace("MainTabs")
    } catch (error) {
      Alert.alert("Error", "Failed to continue as guest. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.appName}>Restaurant App</Text>
        <Text style={styles.subtitle}>Delicious food delivered to your door</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin} disabled={isLoading}>
          <Ionicons name="log-in" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.loginButtonText}>{isLoading ? "Logging in..." : "Login with Auth0"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.guestButton]} onPress={handleGuestLogin} disabled={isLoading}>
          <Ionicons name="person" size={20} color="#E94864" style={styles.buttonIcon} />
          <Text style={styles.guestButtonText}>{isLoading ? "Please wait..." : "Continue as Guest"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E94864",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 8,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 2,
    borderColor: "white",
  },
  guestButton: {
    backgroundColor: "white",
  },
  buttonIcon: {
    marginRight: 8,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  guestButtonText: {
    color: "#E94864",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 18,
  },
})

export default LoginScreen
