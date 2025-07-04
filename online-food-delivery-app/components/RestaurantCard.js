"use client"

import { useContext } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"

const RestaurantCard = ({ item, onPress }) => {
  const authContext = useContext(AuthContext)
  const cartContext = useContext(CartContext)

  const favoriteRestaurants = authContext?.favoriteRestaurants || []
  const toggleFavoriteRestaurant = authContext?.toggleFavoriteRestaurant
  const canAddItem = cartContext?.canAddItem

  const isFavorite = favoriteRestaurants.includes(item.id)
  const canAddFromThisRestaurant = canAddItem ? canAddItem(item) : true

  const handleFavoritePress = () => {
    if (toggleFavoriteRestaurant) {
      toggleFavoriteRestaurant(item.id)
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress?.(item)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="white" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        {!canAddFromThisRestaurant && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Different Restaurant</Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <TouchableOpacity onPress={handleFavoritePress}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={20} color={isFavorite ? "#E94864" : "#666"} />
          </TouchableOpacity>
        </View>

        <Text style={styles.cuisineType}>{item.type}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            {item.distance} • {item.deliveryTime}
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {item.promo && (
            <View style={[styles.tag, styles.discountTag]}>
              <Text style={styles.discountTagText}>Extra discount</Text>
            </View>
          )}
          {item.freeDelivery && (
            <View style={[styles.tag, styles.deliveryTag]}>
              <Text style={styles.deliveryTagText}>Free delivery</Text>
            </View>
          )}
          {!canAddFromThisRestaurant && (
            <View style={[styles.tag, styles.warningTag]}>
              <Text style={styles.warningTagText}>Clear cart to order</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#FFC107",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 2,
  },
  unavailableBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unavailableText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  cuisineType: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 12,
    color: "#555",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  discountTag: {
    backgroundColor: "#e0f7fa",
  },
  discountTagText: {
    color: "#00838f",
    fontSize: 12,
    fontWeight: "500",
  },
  deliveryTag: {
    backgroundColor: "#fff3e0",
  },
  deliveryTagText: {
    color: "#f57c00",
    fontSize: 12,
    fontWeight: "500",
  },
  warningTag: {
    backgroundColor: "#ffebee",
  },
  warningTagText: {
    color: "#c62828",
    fontSize: 12,
    fontWeight: "500",
  },
})

export default RestaurantCard
