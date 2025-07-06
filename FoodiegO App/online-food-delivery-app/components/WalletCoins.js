"use client"

import { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"

const WalletCoins = () => {
  const authContext = useContext(AuthContext)
  const wallet = authContext?.wallet || 699000
  const coins = authContext?.coins || 1200

  return (
    <View style={styles.container}>
      <View style={styles.walletContainer}>
        <View style={styles.walletItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="wallet" size={20} color="#ec4899" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Tu Billetera</Text>
            <Text style={styles.amount}>S/ {wallet.toLocaleString("es-PE")}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.walletItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="diamond" size={20} color="#ec4899" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Tus Monedas</Text>
            <Text style={styles.amount}>{coins.toLocaleString("es-PE")}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    marginTop: 0,
  },
  walletContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    paddingVertical: 16,
  },
  walletItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 8,
  },
  textContainer: {
    alignItems: "flex-start",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  amount: {
    fontSize: 14,
    color: "#6b7280",
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: "#e5e7eb",
  },
})

export default WalletCoins
