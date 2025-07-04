"use client"

import { useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import ScreenWrapper from "../components/ScreenWrapper"
import StatusBarConfig from "../components/StatusBarConfig"

export default function OrderScreen() {
  const navigation = useNavigation()
  const authContext = useContext(AuthContext)
  const { addToCart, clearCart } = useContext(CartContext)

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders, setOrders] = useState([])

  // Obtener pedidos del contexto de autenticación
  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      // Simular carga de datos
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Obtener pedidos del AuthContext o usar datos mock
      const userOrders = authContext?.user?.orderHistory || getMockOrders()
      setOrders(userOrders)
    } catch (error) {
      console.error("Error loading orders:", error)
      setOrders(getMockOrders()) // Fallback a datos mock
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadOrders()
    setRefreshing(false)
  }

  const getMockOrders = () => [
    {
      id: "order_001",
      orderNumber: "#ORD-2024-001",
      restaurant: {
        id: "1",
        name: "Burger Palace",
        image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
      },
      items: [
        {
          id: "burger_1",
          name: "Classic Burger",
          quantity: 2,
          price: 35000,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
        },
        {
          id: "burger_2",
          name: "Cheese Fries",
          quantity: 1,
          price: 20000,
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop",
        },
      ],
      status: "delivered",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
      total: 90000,
      deliveryFee: 5000,
      estimatedDelivery: "25-35 min",
      deliveryAddress: "Jl. Sudirman No. 123, Jakarta",
    },
    {
      id: "order_002",
      orderNumber: "#ORD-2024-002",
      restaurant: {
        id: "2",
        name: "Pizza Corner",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      },
      items: [
        {
          id: "pizza_1",
          name: "Margherita Pizza",
          quantity: 1,
          price: 55000,
          image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop",
        },
      ],
      status: "in_progress",
      date: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min atrás
      total: 63000,
      deliveryFee: 8000,
      estimatedDelivery: "15-20 min",
      deliveryAddress: "Jl. Thamrin No. 456, Jakarta",
    },
    {
      id: "order_003",
      orderNumber: "#ORD-2024-003",
      restaurant: {
        id: "3",
        name: "Sushi Master",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      },
      items: [
        {
          id: "sushi_1",
          name: "Salmon Roll",
          quantity: 2,
          price: 70000,
          image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=200&fit=crop",
        },
        {
          id: "sushi_4",
          name: "Miso Soup",
          quantity: 2,
          price: 15000,
          image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&h=200&fit=crop",
        },
      ],
      status: "cancelled",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
      total: 170000,
      deliveryFee: 12000,
      estimatedDelivery: "25-30 min",
      deliveryAddress: "Jl. Kemang No. 789, Jakarta",
    },
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Hoy"
    if (diffDays === 2) return "Ayer"
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`

    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case "delivered":
        return {
          label: "Entregado",
          color: "#4CAF50",
          backgroundColor: "#E8F5E8",
          icon: "checkmark-circle",
        }
      case "in_progress":
        return {
          label: "En Progreso",
          color: "#FF9800",
          backgroundColor: "#FFF3E0",
          icon: "time",
        }
      case "preparing":
        return {
          label: "Preparando",
          color: "#2196F3",
          backgroundColor: "#E3F2FD",
          icon: "restaurant",
        }
      case "cancelled":
        return {
          label: "Cancelado",
          color: "#F44336",
          backgroundColor: "#FFEBEE",
          icon: "close-circle",
        }
      default:
        return {
          label: "Desconocido",
          color: "#9E9E9E",
          backgroundColor: "#F5F5F5",
          icon: "help-circle",
        }
    }
  }

  const handleReorder = (order) => {
    Alert.alert("Reordenar Pedido", `¿Quieres agregar los productos de "${order.restaurant.name}" al carrito?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Reordenar",
        onPress: () => {
          // Limpiar carrito actual y agregar items del pedido
          clearCart()
          order.items.forEach((item) => {
            for (let i = 0; i < item.quantity; i++) {
              addToCart(item, order.restaurant)
            }
          })
          Alert.alert("¡Listo!", "Productos agregados al carrito", [
            { text: "Ver Carrito", onPress: () => navigation.navigate("Cart") },
            { text: "Seguir Comprando", style: "cancel" },
          ])
        },
      },
    ])
  }

  const handleTrackOrder = (order) => {
    if (order.status === "in_progress" || order.status === "preparing") {
      Alert.alert(
        "Seguimiento",
        `Tu pedido ${order.orderNumber} está ${getStatusInfo(order.status).label.toLowerCase()}`,
      )
    } else {
      Alert.alert("Información", "Este pedido ya no se puede rastrear")
    }
  }

  const renderOrderItem = ({ item: order, index }) => {
    const statusInfo = getStatusInfo(order.status)

    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => setSelectedOrder(order)}
        activeOpacity={0.7}
        key={order.id}
      >
        <View style={styles.orderHeader}>
          <View style={styles.restaurantInfo}>
            <Image source={{ uri: order.restaurant.image }} style={styles.restaurantImage} />
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{order.restaurant.name}</Text>
              <Text style={styles.orderNumber}>{order.orderNumber}</Text>
              <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.backgroundColor }]}>
            <Ionicons name={statusInfo.icon} size={16} color={statusInfo.color} />
            <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          <Text style={styles.itemsTitle}>
            {order.items.length} producto{order.items.length > 1 ? "s" : ""}:
          </Text>
          {order.items.slice(0, 2).map((item, idx) => (
            <Text key={idx} style={styles.itemText}>
              {item.quantity}x {item.name}
            </Text>
          ))}
          {order.items.length > 2 && <Text style={styles.moreItems}>+{order.items.length - 2} más...</Text>}
        </View>

        <View style={styles.orderFooter}>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>S/ {order.total.toLocaleString("es-PE")}</Text>
          </View>
          <View style={styles.actionButtons}>
            {(order.status === "in_progress" || order.status === "preparing") && (
              <TouchableOpacity style={styles.trackButton} onPress={() => handleTrackOrder(order)}>
                <MaterialIcons name="track-changes" size={16} color="#2196F3" />
                <Text style={styles.trackButtonText}>Rastrear</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.reorderButton} onPress={() => handleReorder(order)}>
              <Ionicons name="repeat" size={16} color="#E94864" />
              <Text style={styles.reorderButtonText}>Reordenar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <FontAwesome5 name="receipt" size={60} color="#E94864" />
      </View>
      <Text style={styles.emptyTitle}>No tienes pedidos aún</Text>
      <Text style={styles.emptySubtitle}>Cuando hagas tu primer pedido, aparecerá aquí</Text>
      <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate("Inicio")}>
        <Text style={styles.exploreButtonText}>Explorar Restaurantes</Text>
      </TouchableOpacity>
    </View>
  )

  const renderOrderDetails = () => {
    if (!selectedOrder) return null

    const statusInfo = getStatusInfo(selectedOrder.status)

    return (
      <Modal visible={!!selectedOrder} animationType="slide" presentationStyle="pageSheet">
        <ScreenWrapper edges={["top"]}>
          <StatusBarConfig barStyle="dark-content" backgroundColor="#FFFFFF" />
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedOrder(null)} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#1D1D1F" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Detalles del Pedido</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.modalContent}>
            <View style={styles.orderDetailHeader}>
              <Text style={styles.orderDetailNumber}>{selectedOrder.orderNumber}</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusInfo.backgroundColor }]}>
                <Ionicons name={statusInfo.icon} size={16} color={statusInfo.color} />
                <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
              </View>
            </View>

            <View style={styles.restaurantSection}>
              <Image source={{ uri: selectedOrder.restaurant.image }} style={styles.modalRestaurantImage} />
              <View>
                <Text style={styles.modalRestaurantName}>{selectedOrder.restaurant.name}</Text>
                <Text style={styles.orderDetailDate}>{formatDate(selectedOrder.date)}</Text>
              </View>
            </View>

            <View style={styles.itemsSection}>
              <Text style={styles.sectionTitle}>Productos Pedidos</Text>
              {selectedOrder.items.map((item, index) => (
                <View key={index} style={styles.detailItem}>
                  <Image source={{ uri: item.image }} style={styles.itemDetailImage} />
                  <View style={styles.itemDetailInfo}>
                    <Text style={styles.itemDetailName}>{item.name}</Text>
                    <Text style={styles.itemDetailQuantity}>Cantidad: {item.quantity}</Text>
                  </View>
                  <Text style={styles.itemDetailPrice}>S/ {(item.price * item.quantity).toLocaleString("es-PE")}</Text>
                </View>
              ))}
            </View>

            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>
  S/ {(selectedOrder.total - selectedOrder.deliveryFee).toLocaleString("es-PE")}
</Text>

              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Envío:</Text>
                <Text style={styles.summaryValue}>S/ {selectedOrder.deliveryFee.toLocaleString("es-PE")}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalSummaryRow]}>
                <Text style={styles.totalSummaryLabel}>Total:</Text>
                <Text style={styles.totalSummaryValue}>S/ {selectedOrder.total.toLocaleString("es-PE")}</Text>
              </View>
            </View>

            <View style={styles.addressSection}>
              <Text style={styles.sectionTitle}>Dirección de Entrega</Text>
              <Text style={styles.addressText}>{selectedOrder.deliveryAddress}</Text>
            </View>
          </View>
        </ScreenWrapper>
      </Modal>
    )
  }

  if (loading) {
    return (
      <ScreenWrapper>
        <StatusBarConfig />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E94864" />
          <Text style={styles.loadingText}>Cargando pedidos...</Text>
        </View>
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      <StatusBarConfig />
      <View style={styles.header}>
        <Text style={styles.title}>Mis Pedidos</Text>
        <Text style={styles.subtitle}>Historial de tus pedidos recientes</Text>
      </View>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#E94864"]} />}
        />
      ) : (
        renderEmptyState()
      )}

      {renderOrderDetails()}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
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
  listContainer: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  restaurantInfo: {
    flexDirection: "row",
    flex: 1,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 2,
  },
  orderNumber: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: "#8E8E93",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 14,
    color: "#E94864",
    fontStyle: "italic",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E94864",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
  },
  trackButtonText: {
    fontSize: 12,
    color: "#2196F3",
    marginLeft: 4,
    fontWeight: "500",
  },
  reorderButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FFE8EC",
    borderRadius: 8,
  },
  reorderButtonText: {
    fontSize: 12,
    color: "#E94864",
    marginLeft: 4,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFE8EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: "#E94864",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  // Modal styles
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  placeholder: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  orderDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  orderDetailNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  restaurantSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  modalRestaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  modalRestaurantName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  orderDetailDate: {
    fontSize: 14,
    color: "#8E8E93",
  },
  itemsSection: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    padding: 20,
    paddingBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  itemDetailImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetailInfo: {
    flex: 1,
  },
  itemDetailName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1D1D1F",
    marginBottom: 2,
  },
  itemDetailQuantity: {
    fontSize: 14,
    color: "#8E8E93",
  },
  itemDetailPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  summarySection: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
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
  totalSummaryRow: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E7",
    paddingTop: 12,
    marginTop: 4,
  },
  totalSummaryLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  totalSummaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E94864",
  },
  addressSection: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: "#1D1D1F",
    paddingHorizontal: 20,
    paddingBottom: 20,
    lineHeight: 24,
  },
})
