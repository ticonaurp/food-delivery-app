"use client";

import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import Animated, { FadeInDown } from "react-native-reanimated";
import { formatearSoles } from "../utils/currencyUtils";

const OrderTrackingScreen = ({ route }) => {
  const { orderId } = route.params;
  const { orderHistory } = useContext(AuthContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = orderHistory.find((o) => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId, orderHistory]);

  const trackingSteps = [
    { key: "pending", title: "Order Confirmed", icon: "checkmark-circle" },
    { key: "preparing", title: "Preparing Your Food", icon: "restaurant" },
    { key: "on_way", title: "On the Way", icon: "bicycle" },
    { key: "delivered", title: "Delivered", icon: "home" },
  ];

  const getCurrentStepIndex = (status) => {
    return trackingSteps.findIndex((step) => step.key === status);
  };

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
      </View>
    );
  }

  const currentStepIndex = getCurrentStepIndex(order.status);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={styles.orderInfo}
      >
        <Text style={styles.orderId}>
          Order #{order.id.slice(-8).toUpperCase()}
        </Text>
        <Text style={styles.restaurantName}>{order.restaurant?.name}</Text>
        <Text style={styles.estimatedTime}>
          Estimated delivery: {order.estimatedDelivery}
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200)}
        style={styles.trackingContainer}
      >
        <Text style={styles.sectionTitle}>Order Status</Text>
        {trackingSteps.map((step, index) => (
          <View key={step.key} style={styles.trackingStep}>
            <View style={styles.stepIndicator}>
              <View
                style={[
                  styles.stepCircle,
                  {
                    backgroundColor:
                      index <= currentStepIndex ? "#4CAF50" : "#E0E0E0",
                  },
                ]}
              >
                <Ionicons
                  name={step.icon}
                  size={20}
                  color={index <= currentStepIndex ? "white" : "#999"}
                />
              </View>
              {index < trackingSteps.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    {
                      backgroundColor:
                        index < currentStepIndex ? "#4CAF50" : "#E0E0E0",
                    },
                  ]}
                />
              )}
            </View>
            <View style={styles.stepContent}>
              <Text
                style={[
                  styles.stepTitle,
                  {
                    color: index <= currentStepIndex ? "#333" : "#999",
                    fontWeight: index === currentStepIndex ? "bold" : "normal",
                  },
                ]}
              >
                {step.title}
              </Text>
              {index === currentStepIndex && (
                <Text style={styles.currentStep}>Current Status</Text>
              )}
            </View>
          </View>
        ))}
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400)}
        style={styles.orderDetails}
      >
        <Text style={styles.sectionTitle}>Order Details</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Text style={styles.itemQuantity}>{item.quantity}x</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              {formatearSoles(
                (item.discountPrice || item.originalPrice || item.price) *
                  item.quantity
              )}
            </Text>
          </View>
        ))}

        <View style={styles.orderSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatearSoles(order.subtotal)}</Text>

          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>{formatearSoles(order.deliveryFee)}</Text>

          </View>
          {order.coinsUsed > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Coins Discount</Text>
              <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
  -{formatearSoles(order.coinsUsed * 1000)}
</Text>

            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatearSoles(order.finalAmount)}</Text>

          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  orderInfo: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E94864",
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 16,
    color: "#777",
  },
  trackingContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  trackingStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: 16,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLine: {
    width: 2,
    height: 30,
    marginTop: 8,
  },
  stepContent: {
    flex: 1,
    paddingTop: 8,
  },
  stepTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  currentStep: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
  },
  orderDetails: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    width: 30,
  },
  itemName: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  orderSummary: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E94864",
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
});

export default OrderTrackingScreen;