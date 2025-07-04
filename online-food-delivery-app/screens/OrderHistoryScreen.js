"use client"

import { useContext } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"
import Animated, { FadeInUp } from "react-native-reanimated"

const OrderHistoryScreen = ({ navigation }) => {
  const { orderHistory } = useContext(AuthContext)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#FFC107"
      case "preparing":
        return "#FF9800"
      case "on_way":
        return "#2196F3"
      case "delivered":
        return "#4CAF50"
      case "cancelled":
        return "#F44336"
      default:
        return "#777"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "preparing":
        return "Preparing"
      case "on_way":
        return "On the way"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  const renderOrderItem = ({ item, index }) => (
    <Animated.View entering={FadeInUp.delay(index * 100)}>
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => navigation.navigate("OrderTracking", { orderId: item.id })}
      >
        <View style={styles.orderHeader}>
          <Text style={styles.restaurantName}>{item.restaurant?.name || "Restaurant"}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>

        <Text style={styles.orderDate}>{formatDate(item.timestamp)}</Text>

        <View style={styles.orderItems}>
          {item.items.slice(0, 2).map((orderItem, idx) => (
            <Text key={idx} style={styles.itemText}>
              {orderItem.quantity}x {orderItem.name}
            </Text>
          ))}
          {item.items.length > 2 && <Text style={styles.moreItems}>+{item.items.length - 2} more items</Text>}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.totalAmount}>Rp {item.finalAmount.toLocaleString("id-ID")}</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={80} color="#ccc" />
      <Text style={styles.emptyTitle}>No Orders Yet</Text>
      <Text style={styles.emptySubtitle}>Your order history will appear here once you place your first order.</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={orderHistory}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
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
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  orderDate: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E94864",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 40,
  },
})

export default OrderHistoryScreen
