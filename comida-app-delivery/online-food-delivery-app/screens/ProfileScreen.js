"use client";

import { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user, login, logout, loading, wallet, coins, setWallet, setCoins } =
    useContext(AuthContext);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundAmount, setFundAmount] = useState("");

  const handleAddFunds = () => {
    const amount = Number.parseInt(fundAmount);
    if (amount > 0) {
      setWallet(wallet + amount);
      setFundAmount("");
      setShowAddFunds(false);
      Alert.alert(
        "Success",
        `Added Rp ${amount.toLocaleString("id-ID")} to your wallet!`
      );
    }
  };

  // Si no hay usuario, mostrar pantalla de login
  if (!user) {
    return (
      <View style={styles.container}>
        <Animatable.View
          animation="fadeIn"
          duration={800}
          style={styles.loginContainer}
        >
          <View style={styles.logoContainer}>
            <Ionicons name="person-circle" size={100} color="#E74C3C" />
          </View>

          <Text style={styles.welcomeTitle}>Welcome to Restaurant App</Text>
          <Text style={styles.welcomeSubtitle}>
            Sign in to access your profile, wallet, and order history
          </Text>

          <TouchableOpacity
            onPress={login}
            disabled={loading}
            style={styles.loginBtn}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons
                  name="log-in"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.loginText}>Sign in with Auth0</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("MainTabs")}
            style={styles.guestBtn}
          >
            <Ionicons
              name="person"
              size={20}
              color="#E74C3C"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }

  // Si hay usuario, mostrar perfil completo
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Animatable.View animation="fadeInUp" duration={800}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user.picture ? (
              <Image source={{ uri: user.picture }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color="#666" />
              </View>
            )}
          </View>
          <Text style={styles.name}>¡Hola, {user.name || "Usuario"}!</Text>
          <Text style={styles.email}>{user.email}</Text>
          {user.guest && (
            <View style={styles.guestBadge}>
              <Text style={styles.guestBadgeText}>Guest User</Text>
            </View>
          )}
        </View>

        {/* Wallet y Coins */}
        <View style={styles.walletSection}>
          <Text style={styles.sectionTitle}>Your Balance</Text>

          <View style={styles.balanceCards}>
            <View style={styles.balanceCard}>
              <View style={styles.balanceIcon}>
                <Ionicons name="wallet" size={24} color="#4CAF50" />
              </View>
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceLabel}>Wallet</Text>
                <Text style={styles.balanceAmount}>
                  Rp {wallet.toLocaleString("id-ID")}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddFunds(true)}
              >
                <Ionicons name="add" size={16} color="#4CAF50" />
              </TouchableOpacity>
            </View>

            <View style={styles.balanceCard}>
              <View style={styles.balanceIcon}>
                <Ionicons name="diamond" size={24} color="#FFD700" />
              </View>
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceLabel}>Coins</Text>
                <Text style={styles.balanceAmount}>
                  {coins.toLocaleString("id-ID")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Add Funds Modal */}
        {showAddFunds && (
          <Animatable.View animation="slideInUp" style={styles.addFundsModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Funds to Wallet</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter amount (Rp)"
                value={fundAmount}
                onChangeText={setFundAmount}
                keyboardType="numeric"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAddFunds(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleAddFunds}
                >
                  <Text style={styles.confirmButtonText}>Add Funds</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        )}

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("OrderHistory")}
          >
            <Ionicons name="receipt" size={20} color="#666" />
            <Text style={styles.menuText}>Order History</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Favorites")}
          >
            <Ionicons name="heart" size={20} color="#666" />
            <Text style={styles.menuText}>Favorite Restaurants</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="location" size={20} color="#666" />
            <Text style={styles.menuText}>Delivery Addresses</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card" size={20} color="#666" />
            <Text style={styles.menuText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings" size={20} color="#666" />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle" size={20} color="#666" />
            <Text style={styles.menuText}>Help Center</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="chatbubble" size={20} color="#666" />
            <Text style={styles.menuText}>Contact Support</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Ionicons
            name="log-out"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logoContainer: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  loginBtn: {
    backgroundColor: "#E74C3C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    width: "100%",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  guestBtn: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E74C3C",
    width: "100%",
  },
  guestText: {
    color: "#E74C3C",
    fontSize: 16,
    fontWeight: "600",
  },
  profileHeader: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  guestBadge: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  guestBadgeText: {
    color: "#F57C00",
    fontSize: 12,
    fontWeight: "600",
  },
  walletSection: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  balanceCards: {
    gap: 12,
  },
  balanceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  balanceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  addFundsModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "600",
  },
  menuSection: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 16,
  },
  logoutBtn: {
    backgroundColor: "#E74C3C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
