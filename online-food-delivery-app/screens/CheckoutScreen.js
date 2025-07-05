"use client";

import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import ScreenWrapper from "../components/ScreenWrapper";
import StatusBarConfig from "../components/StatusBarConfig";
import { formatearSoles } from "../utils/currencyUtils"

export default function CheckoutScreen() {
  const navigation = useNavigation();


  // ✅ VERIFICAR QUE LOS CONTEXTOS EXISTAN
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [coinsToUse, setCoinsToUse] = useState(0);

  // ✅ DEBUG: Mostrar datos en consola
  useEffect(() => {
    console.log("🔍 CheckoutScreen - Datos del contexto:");
    console.log(
      "CartContext:",
      cartContext ? "✅ Disponible" : "❌ No disponible"
    );
    console.log(
      "AuthContext:",
      authContext ? "✅ Disponible" : "❌ No disponible"
    );

    if (authContext?.user) {
      console.log("👤 Usuario:", {
        name: authContext.user.name,
        wallet: authContext.user.wallet,
        coins: authContext.user.coins,
      });
    }

    if (cartContext) {
      console.log("🛒 Carrito:", {
        items: cartContext.cartItems?.length || 0,
        total: cartContext.getTotal ? cartContext.getTotal() : 0,
      });
    }
  }, [cartContext, authContext]);

  // ✅ VERIFICACIÓN DE SEGURIDAD
  useEffect(() => {
    if (!cartContext) {
      console.error("❌ CartContext no disponible");
      Alert.alert("Error", "Error del sistema. Regresando al carrito.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
      return;
    }

    if (!authContext) {
      console.error("❌ AuthContext no disponible");
      Alert.alert("Error", "Debes iniciar sesión para continuar.", [
        { text: "OK", onPress: () => navigation.navigate("Profile") },
      ]);
      return;
    }

    // Verificar que hay items en el carrito
    if (cartContext.cartItems?.length === 0) {
      Alert.alert("Carrito vacío", "No hay productos para procesar.", [
        { text: "OK", onPress: () => navigation.navigate("Cart") },
      ]);
      return;
    }
  }, [cartContext, authContext, navigation]);

  // ✅ EARLY RETURN SI NO HAY CONTEXTOS
  if (!cartContext || !authContext) {
    return (
      <ScreenWrapper>
        <StatusBarConfig />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E94864" />
          <Text style={styles.loadingText}>Cargando checkout...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  // ✅ DESTRUCTURING SEGURO
  const {
    cartItems = [],
    selectedRestaurant,
    getSubtotal,
    getTotal,
    processOrder,
    deliveryFee = 0,
  } = cartContext;

  const {
    user = {},
    wallet,
    coins,
    updateWalletAfterPurchase,
    useCoinsAsDiscount,
    earnCoins,
  } = authContext;

  const subtotal = getSubtotal ? getSubtotal() : 0;
  const total = getTotal ? getTotal() : 0;
const userCoins = coins || 0;
const userWallet = wallet || 0;

  // ✅ FUNCIÓN PARA AGREGAR FONDOS (DEMO)
  const handleAddFunds = () => {
    Alert.alert("Agregar Fondos", "¿Cuánto quieres agregar a tu wallet?", [
      { text: "Cancelar", style: "cancel" },
      { text: "$50", onPress: () => authContext.addFundsToWallet(50) },
      { text: "$100", onPress: () => authContext.addFundsToWallet(100) },
      { text: "$200", onPress: () => authContext.addFundsToWallet(200) },
    ]);
  };

  const handleProcessOrder = async () => {
    try {
      setLoading(true);

      console.log("🔄 Procesando orden...");
      console.log("💰 Método de pago:", paymentMethod);
      console.log("💰 Total a pagar:", total);
      console.log("💰 Saldo wallet:", userWallet);
      console.log("🪙 Coins a usar:", coinsToUse);

      // Verificar fondos si es pago con wallet
      if (paymentMethod === "wallet" && userWallet < total - coinsToUse) {
        Alert.alert(
          "Fondos insuficientes",
          `Necesitas $${(total - coinsToUse).toFixed(
            2
          )} pero solo tienes $${userWallet.toFixed(2)}`,
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Agregar fondos", onPress: handleAddFunds },
          ]
        );
        return;
      }

      // Verificar coins si se van a usar
      if (coinsToUse > 0 && userCoins < coinsToUse) {
        Alert.alert(
          "Coins insuficientes",
          `No tienes suficientes coins. Tienes: ${userCoins}, necesitas: ${coinsToUse}`
        );
        return;
      }

      // Procesar orden
      const result = await processOrder(paymentMethod, coinsToUse);

      Alert.alert(
        "¡Pedido exitoso!",
        `Tu pedido #${result.orderId} ha sido procesado.\n\nGanaste ${result.coinsEarned} coins 🎉`,
        [
          {
            text: "Ver pedidos",
            onPress: () => navigation.navigate("Pedidos"),
          },
        ]
      );
    } catch (error) {
      console.error("❌ Error processing order:", error);
      Alert.alert("Error", error.message || "No se pudo procesar el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <StatusBarConfig />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ✅ INFO DEL USUARIO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu cuenta</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name || "Usuario"}</Text>
            <Text style={styles.userEmail}>
              {user.email || "email@example.com"}
            </Text>
          </View>
        </View>

        {/* Restaurante */}
        {selectedRestaurant && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Restaurante</Text>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>
                {selectedRestaurant.name}
              </Text>
              <Text style={styles.restaurantType}>
                {selectedRestaurant.type}
              </Text>
            </View>
          </View>
        )}

        {/* Items del pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Tu pedido ({cartItems.length} productos)
          </Text>
          {cartItems.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.orderItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>
                $
                {(
                  (item.discountPrice ||
                    item.originalPrice ||
                    item.price ||
                    0) * item.quantity
                ).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Método de pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de pago</Text>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "wallet" && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod("wallet")}
          >
            <Ionicons name="wallet" size={24} color="#E94864" />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Mi Wallet</Text>
              <Text style={styles.paymentBalance}>
                Balance:{" "}
                {userWallet.toLocaleString("es-PE", {
                  style: "currency",
                  currency: "PEN",
                })}
              </Text>
            </View>
            {paymentMethod === "wallet" && (
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>

          {/* ✅ BOTÓN PARA AGREGAR FONDOS */}
          {userWallet < total && (
            <TouchableOpacity
              style={styles.addFundsButton}
              onPress={handleAddFunds}
            >
              <Ionicons name="add-circle" size={20} color="#E94864" />
              <Text style={styles.addFundsText}>Agregar fondos al wallet</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "cash" && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod("cash")}
          >
            <Ionicons name="cash" size={24} color="#E94864" />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Efectivo</Text>
              <Text style={styles.paymentBalance}>Pagar al recibir</Text>
            </View>
            {paymentMethod === "cash" && (
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
        </View>

        {/* Usar coins */}
        {userCoins > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Usar Coins 🪙</Text>
            <View style={styles.coinsSection}>
              <Text style={styles.coinsAvailable}>
                Tienes {userCoins} coins disponibles
              </Text>
              <Text style={styles.coinsValue}>1 coin = $1.00 descuento</Text>

              <View style={styles.coinsControls}>
                <TouchableOpacity
                  style={styles.coinsButton}
                  onPress={() => setCoinsToUse(Math.max(0, coinsToUse - 1))}
                >
                  <Ionicons name="remove" size={20} color="#E94864" />
                </TouchableOpacity>

                <Text style={styles.coinsAmount}>{coinsToUse}</Text>

                <TouchableOpacity
                  style={styles.coinsButton}
                  onPress={() =>
                    setCoinsToUse(
                      Math.min(userCoins, coinsToUse + 1, Math.floor(total))
                    )
                  }
                >
                  <Ionicons name="add" size={20} color="#E94864" />
                </TouchableOpacity>
              </View>

              {/* ✅ BOTÓN RÁPIDO PARA USAR TODOS LOS COINS */}
              <TouchableOpacity
                style={styles.useAllCoinsButton}
                onPress={() =>
                  setCoinsToUse(Math.min(userCoins, Math.floor(total)))
                }
              >
                <Text style={styles.useAllCoinsText}>Usar todos mis coins</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Resumen */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del pedido</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío:</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          {coinsToUse > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Descuento ({coinsToUse} coins):
              </Text>
              <Text style={styles.summaryDiscount}>
                -${coinsToUse.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total a pagar:</Text>
            <Text style={styles.totalAmount}>
              {Math.max(0, total - coinsToUse).toLocaleString("es-PE", {
                style: "currency",
                currency: "PEN",
              })}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Botón de pago */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={handleProcessOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.payButtonText}>
              Pagar ${Math.max(0, total - coinsToUse).toFixed(2)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#8E8E93",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D1D1F",
  },
  placeholder: {
    width: 40,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 16,
  },
  // ✅ ESTILOS PARA INFO DEL USUARIO
  userInfo: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#8E8E93",
  },
  restaurantInfo: {
    borderLeftWidth: 4,
    borderLeftColor: "#E94864",
    paddingLeft: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  restaurantType: {
    fontSize: 14,
    color: "#8E8E93",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: "#1D1D1F",
  },
  itemQuantity: {
    fontSize: 16,
    color: "#8E8E93",
    marginHorizontal: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#F2F2F7",
    marginBottom: 12,
  },
  selectedPayment: {
    borderColor: "#E94864",
    backgroundColor: "#FFE8EC",
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  paymentBalance: {
    fontSize: 14,
    color: "#8E8E93",
  },
  // ✅ ESTILO PARA FONDOS INSUFICIENTES
  insufficientFunds: {
    color: "#FF4444",
    fontWeight: "600",
  },
  // ✅ BOTÓN PARA AGREGAR FONDOS
  addFundsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#FFE8EC",
    borderRadius: 8,
    marginBottom: 16,
  },
  addFundsText: {
    fontSize: 14,
    color: "#E94864",
    fontWeight: "600",
    marginLeft: 8,
  },
  coinsSection: {
    alignItems: "center",
  },
  coinsAvailable: {
    fontSize: 16,
    color: "#1D1D1F",
    marginBottom: 4,
  },
  coinsValue: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 16,
  },
  coinsControls: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  coinsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  coinsAmount: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    color: "#1D1D1F",
  },
  // ✅ BOTÓN PARA USAR TODOS LOS COINS
  useAllCoinsButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  useAllCoinsText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#8E8E93",
  },
  summaryValue: {
    fontSize: 16,
    color: "#1D1D1F",
    fontWeight: "500",
  },
  summaryDiscount: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E7",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E94864",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E7",
  },
  payButton: {
    backgroundColor: "#E94864",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  payButtonDisabled: {
    backgroundColor: "#8E8E93",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});