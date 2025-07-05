"use client"

import { useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { CartContext } from "../context/CartContext"
import { FavoritesContext } from "../context/FavoritesContext"
import { getNearbyRestaurants } from "../data/restaurants"
import StatusBarConfig from "../components/StatusBarConfig"

export default function NearMeScreen() {
  const navigation = useNavigation()
  const { addToCart } = useContext(CartContext)
  const { toggleFavoriteRestaurant, isRestaurantFavorite } = useContext(FavoritesContext)

  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedDistance, setSelectedDistance] = useState(5) // km

  useEffect(() => {
    loadNearbyRestaurants()
  }, [selectedDistance])

  const loadNearbyRestaurants = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      const nearbyRestaurants = getNearbyRestaurants(selectedDistance)
      setRestaurants(nearbyRestaurants)
    } catch (error) {
      console.error("Error loading nearby restaurants:", error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadNearbyRestaurants()
    setRefreshing(false)
  }

  const handleToggleFavorite = (restaurant) => {
    toggleFavoriteRestaurant(restaurant)
  }

  const renderRestaurant = ({ item: restaurant }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => navigation.navigate("RestaurantDetail", { restaurant })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => handleToggleFavorite(restaurant)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isRestaurantFavorite(restaurant.id) ? "heart" : "heart-outline"}
          size={20}
          color={isRestaurantFavorite(restaurant.id) ? "#E94864" : "#FFFFFF"}
        />
      </TouchableOpacity>

      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text style={styles.restaurantType}>{restaurant.type}</Text>

        <View style={styles.restaurantStats}>
          <View style={styles.statItem}>
            <Ionicons name="time" size={14} color="#8E8E93" />
            <Text style={styles.statText}>{restaurant.deliveryTime}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="location" size={14} color="#8E8E93" />
            <Text style={styles.statText}>{restaurant.distance}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="car" size={14} color="#8E8E93" />
            <Text style={styles.statText}>{restaurant.deliveryFee}</Text>
          </View>
        </View>

        {restaurant.freeDelivery && (
          <View style={styles.freeDeliveryBadge}>
            <Text style={styles.freeDeliveryText}>Envío Gratis</Text>
          </View>
        )}

        {restaurant.promo && (
          <View style={styles.promoBadge}>
            <Text style={styles.promoText}>Promoción</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  const renderDistanceFilter = () => (
    <View style={styles.filtersContainer}>
      <Text style={styles.filtersTitle}>Distancia máxima:</Text>
      <View style={styles.distanceButtons}>
        {[1, 2, 5, 10].map((distance) => (
          <TouchableOpacity
            key={distance}
            style={[styles.distanceButton, selectedDistance === distance && styles.selectedDistanceButton]}
            onPress={() => setSelectedDistance(distance)}
          >
            <Text
              style={[styles.distanceButtonText, selectedDistance === distance && styles.selectedDistanceButtonText]}
            >
              {distance}km
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBarConfig />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
          </TouchableOpacity>
          <Text style={styles.title}>Cerca de Ti</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E94864" />
          <Text style={styles.loadingText}>Buscando restaurantes cercanos...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarConfig />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
        </TouchableOpacity>
        <Text style={styles.title}>Cerca de Ti</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#1D1D1F" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderDistanceFilter}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#E94864"]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={60} color="#8E8E93" />
            <Text style={styles.emptyTitle}>No hay restaurantes cerca</Text>
            <Text style={styles.emptySubtitle}>Intenta aumentar la distancia de búsqueda</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
  searchButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
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
  filtersContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 8,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 12,
  },
  distanceButtons: {
    flexDirection: "row",
    gap: 8,
  },
  distanceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "#E5E5E7",
  },
  selectedDistanceButton: {
    backgroundColor: "#E94864",
    borderColor: "#E94864",
  },
  distanceButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
  },
  selectedDistanceButtonText: {
    color: "#FFFFFF",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  restaurantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#F2F2F7",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D1D1F",
    marginLeft: 4,
  },
  restaurantType: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 12,
  },
  restaurantStats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 4,
  },
  freeDeliveryBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  freeDeliveryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  promoBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#FF6B35",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  promoText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1D1D1F",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
  },
})