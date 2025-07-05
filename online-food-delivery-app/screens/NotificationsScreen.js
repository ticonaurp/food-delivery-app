"use client"

import { useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl,
  Switch,
  Modal,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { AuthContext } from "../context/AuthContext"
import StatusBarConfig from "../components/StatusBarConfig"

export default function NotificationsScreen() {
  const navigation = useNavigation()
  const authContext = useContext(AuthContext)

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all") // "all", "orders", "promos", "system"
  const [showSettings, setShowSettings] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    orders: true,
    promos: true,
    system: true,
    sound: true,
    vibration: true,
    email: false,
  })

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setNotifications(getMockNotifications())
    } catch (error) {
      console.error("Error loading notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadNotifications()
    setRefreshing(false)
  }

  const getMockNotifications = () => [
    {
      id: "notif_001",
      type: "order",
      title: "¡Pedido entregado!",
      message: "Tu pedido #ORD-2024-001 de Burger Palace ha sido entregado exitosamente.",
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 min ago
      read: false,
      icon: "checkmark-circle",
      color: "#4CAF50",
      action: {
        type: "navigate",
        screen: "OrderHistory",
      },
    },
    {
      id: "notif_002",
      type: "promo",
      title: "🎉 ¡Oferta especial!",
      message: "Descuento del 50% en Pizza Corner. Válido hasta medianoche.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      read: false,
      icon: "pricetag",
      color: "#FF6B35",
      action: {
        type: "navigate",
        screen: "FilteredPlatos",
        params: { filterType: "descuento", title: "Ofertas Especiales" },
      },
    },
    {
      id: "notif_003",
      type: "order",
      title: "Pedido en preparación",
      message: "Tu pedido de Sushi Master está siendo preparado. Tiempo estimado: 20 min.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
      read: true,
      icon: "restaurant",
      color: "#2196F3",
      action: {
        type: "navigate",
        screen: "OrderTracking",
        params: { orderId: "order_002" },
      },
    },
    {
      id: "notif_004",
      type: "system",
      title: "Actualización disponible",
      message: "Nueva versión de la app disponible con mejoras y nuevas funciones.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      read: true,
      icon: "download",
      color: "#9C27B0",
      action: {
        type: "external",
        url: "https://play.google.com/store",
      },
    },
    {
      id: "notif_005",
      type: "promo",
      title: "¡Bienvenido!",
      message: "Gracias por unirte. Disfruta de envío gratis en tu primer pedido.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      read: true,
      icon: "gift",
      color: "#E91E63",
      action: {
        type: "navigate",
        screen: "NearMeScreen",
      },
    },
    {
      id: "notif_006",
      type: "order",
      title: "Recordatorio de pago",
      message: "Tu pedido está listo para pagar. No olvides completar tu compra.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      read: true,
      icon: "card",
      color: "#FF9800",
      action: {
        type: "navigate",
        screen: "Cart",
      },
    },
  ]

  const getFilteredNotifications = () => {
    let filtered = notifications

    switch (selectedTab) {
      case "orders":
        filtered = notifications.filter((n) => n.type === "order")
        break
      case "promos":
        filtered = notifications.filter((n) => n.type === "promo")
        break
      case "system":
        filtered = notifications.filter((n) => n.type === "system")
        break
      default:
        filtered = notifications
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const notifTime = new Date(timestamp)
    const diffMs = now - notifTime
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Ahora"
    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays < 7) return `Hace ${diffDays}d`

    return notifTime.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    })
  }

  const handleNotificationPress = (notification) => {
    // Marcar como leída
    if (!notification.read) {
      setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
    }

    // Ejecutar acción
    if (notification.action) {
      switch (notification.action.type) {
        case "navigate":
          navigation.navigate(notification.action.screen, notification.action.params)
          break
        case "external":
          Alert.alert("Abrir enlace", `¿Quieres abrir ${notification.action.url}?`, [
            { text: "Cancelar", style: "cancel" },
            { text: "Abrir", onPress: () => console.log("Opening:", notification.action.url) },
          ])
          break
      }
    }
  }

  const handleMarkAllAsRead = () => {
    Alert.alert("Marcar todas como leídas", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí",
        onPress: () => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        },
      },
    ])
  }

  const handleClearAll = () => {
    Alert.alert("Limpiar notificaciones", "¿Quieres eliminar todas las notificaciones?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => setNotifications([]),
      },
    ])
  }

  const renderNotification = ({ item: notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !notification.read && styles.unreadNotification]}
      onPress={() => handleNotificationPress(notification)}
      activeOpacity={0.7}
    >
      <View style={[styles.notificationIcon, { backgroundColor: notification.color + "20" }]}>
        <Ionicons name={notification.icon} size={24} color={notification.color} />
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.notificationTitle, !notification.read && styles.unreadTitle]}>{notification.title}</Text>
          <Text style={styles.notificationTime}>{formatTimestamp(notification.timestamp)}</Text>
        </View>

        <Text style={styles.notificationMessage} numberOfLines={2}>
          {notification.message}
        </Text>

        <View style={styles.notificationFooter}>
          <View style={[styles.typeTag, { backgroundColor: notification.color + "15" }]}>
            <Text style={[styles.typeTagText, { color: notification.color }]}>
              {notification.type === "order" && "Pedido"}
              {notification.type === "promo" && "Promoción"}
              {notification.type === "system" && "Sistema"}
            </Text>
          </View>

          {!notification.read && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderSettingsModal = () => (
    <Modal visible={showSettings} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <StatusBarConfig />

        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowSettings(false)} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Configuración de Notificaciones</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.settingsContent}>
          <Text style={styles.settingsSection}>Tipos de notificaciones</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="receipt" size={20} color="#4CAF50" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Pedidos</Text>
                <Text style={styles.settingDescription}>Estado de pedidos y entregas</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.orders}
              onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, orders: value }))}
              trackColor={{ false: "#E5E5E7", true: "#E94864" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="pricetag" size={20} color="#FF6B35" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Promociones</Text>
                <Text style={styles.settingDescription}>Ofertas y descuentos especiales</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.promos}
              onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, promos: value }))}
              trackColor={{ false: "#E5E5E7", true: "#E94864" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="settings" size={20} color="#9C27B0" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Sistema</Text>
                <Text style={styles.settingDescription}>Actualizaciones y mantenimiento</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.system}
              onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, system: value }))}
              trackColor={{ false: "#E5E5E7", true: "#E94864" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Text style={styles.settingsSection}>Preferencias</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="volume-high" size={20} color="#2196F3" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Sonido</Text>
                <Text style={styles.settingDescription}>Reproducir sonido al recibir notificaciones</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.sound}
              onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, sound: value }))}
              trackColor={{ false: "#E5E5E7", true: "#E94864" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="phone-portrait" size={20} color="#FF9800" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Vibración</Text>
                <Text style={styles.settingDescription}>Vibrar al recibir notificaciones</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.vibration}
              onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, vibration: value }))}
              trackColor={{ false: "#E5E5E7", true: "#E94864" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="mail" size={20} color="#E91E63" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Email</Text>
                <Text style={styles.settingDescription}>Recibir notificaciones por correo</Text>
              </View>
            </View>
            <Switch
              value={notificationSettings.email}
              onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, email: value }))}
              trackColor={{ false: "#E5E5E7", true: "#E94864" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="notifications-off" size={60} color="#E94864" />
      </View>
      <Text style={styles.emptyTitle}>No tienes notificaciones</Text>
      <Text style={styles.emptySubtitle}>Cuando tengas nuevas notificaciones aparecerán aquí</Text>
    </View>
  )

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarConfig />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.title}>Notificaciones</Text>
          <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.settingsButton}>
            <Ionicons name="settings" size={24} color="#1D1D1F" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerStats}>
          <Text style={styles.subtitle}>
            {unreadCount > 0 ? `${unreadCount} sin leer` : "Todas leídas"} • {notifications.length} total
          </Text>
          {notifications.length > 0 && (
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleMarkAllAsRead} style={styles.headerAction}>
                <Text style={styles.headerActionText}>Marcar todas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClearAll} style={styles.headerAction}>
                <Text style={[styles.headerActionText, styles.clearActionText]}>Limpiar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {[
          { key: "all", label: "Todas", count: notifications.length },
          { key: "orders", label: "Pedidos", count: notifications.filter((n) => n.type === "order").length },
          { key: "promos", label: "Ofertas", count: notifications.filter((n) => n.type === "promo").length },
          { key: "system", label: "Sistema", count: notifications.filter((n) => n.type === "system").length },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
            onPress={() => setSelectedTab(tab.key)}
          >
            <Text style={[styles.tabText, selectedTab === tab.key && styles.activeTabText]}>
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de notificaciones */}
      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#E94864"]} />}
        />
      ) : (
        renderEmptyState()
      )}

      {/* Modal de configuración */}
      {renderSettingsModal()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D1D1F",
  },
  settingsButton: {
    padding: 8,
  },
  headerStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerAction: {
    padding: 4,
  },
  headerActionText: {
    fontSize: 14,
    color: "#E94864",
    fontWeight: "600",
  },
  clearActionText: {
    color: "#FF4444",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    marginRight: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#E94864",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E8E93",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: "#E94864",
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    flex: 1,
  },
  unreadTitle: {
    fontWeight: "700",
  },
  notificationTime: {
    fontSize: 12,
    color: "#8E8E93",
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeTagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E94864",
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
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
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
  settingsContent: {
    flex: 1,
    padding: 20,
  },
  settingsSection: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 16,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: "#8E8E93",
  },
})