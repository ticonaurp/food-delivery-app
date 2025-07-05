"use client"

import { useState, useContext } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { CartContext } from "../context/CartContext"

const { width } = Dimensions.get("window")

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant } = route.params
  const [activeTab, setActiveTab] = useState("Popular")
  const { addToCart, canAddItem, cartItems, getTotalItems } = useContext(CartContext)

  const tabs = ["Popular", "Appetizers", "Main Course", "Desserts", "Beverages"]

  const handleAddToCart = (dish) => {
    // Verificar si podemos agregar items de este restaurante
    if (!canAddItem(restaurant)) {
      Alert.alert(
        "Different Restaurant",
        "You have items from a different restaurant in your cart. Would you like to clear your cart and add this item?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear Cart & Add",
            onPress: () => {
              addToCart(dish, restaurant)
              Alert.alert("Added!", `${dish.name} has been added to your cart`)
            },
          },
        ],
      )
      return
    }

    // Agregar al carrito
    addToCart(dish, restaurant)
    Alert.alert("Added to Cart!", `${dish.name} has been added to your cart`, [
      { text: "Continue Shopping" },
      { text: "View Cart", onPress: () => navigation.navigate("Cart") },
    ])
  }

  const TopNavigation = () => (
    <View style={styles.topNavigation}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="search" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="heart-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  )

  const RestaurantInfo = () => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.infoCard}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text style={styles.cuisineType}>{restaurant.type}</Text>

      <View style={styles.addressRow}>
        <Text style={styles.address}>{restaurant.address}</Text>
        <TouchableOpacity>
          <Text style={styles.seeOnMaps}>See on maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{restaurant.rating}</Text>
          <Text style={styles.statLabel}>{restaurant.reviews}+ Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{restaurant.variants}</Text>
          <Text style={styles.statLabel}>Menu variants</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{restaurant.priceRange}</Text>
          <Text style={styles.statLabel}>Price range</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{restaurant.hours}</Text>
          <Text style={styles.statLabel}>Opening hours</Text>
        </View>
      </View>

      <View style={styles.deliveryInfo}>
        <View>
          <Text style={styles.deliveryTitle}>{restaurant.distance} distance</Text>
          <Text style={styles.deliverySubtitle}>
            Est. delivery fee {restaurant.deliveryFee} • Delivery in {restaurant.deliveryTime}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.changeLocation}>Change location</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )

  const DiscountSection = () => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.discountSection}>
      <Text style={styles.sectionTitle}>Discount for you</Text>
      <View style={styles.discountContainer}>
        {restaurant.discounts?.map((discount, index) => (
          <View key={discount.id} style={styles.discountCard}>
            <View style={[styles.discountIcon, { backgroundColor: discount.color }]}>
              <Ionicons name={discount.type === "discount" ? "pricetag" : "bicycle"} size={16} color="white" />
            </View>
            <Text style={styles.discountTitle}>{discount.title}</Text>
            <Text style={styles.discountDescription}>{discount.description}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  )

  const MenuTabs = () => (
    <View style={styles.tabsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  const PopularDishes = () => (
    <Animated.View entering={FadeInDown.delay(400)} style={styles.dishesSection}>
      <Text style={styles.sectionTitle}>Most Popular</Text>
      <View style={styles.dishesGrid}>
        {restaurant.popularDishes?.map((dish) => (
          <View key={dish.id} style={styles.dishCard}>
            <View style={styles.dishImageContainer}>
              <Image source={{ uri: dish.image }} style={styles.dishImage} />
              {dish.hasDiscount && (
                <View style={styles.dishDiscountBadge}>
                  <Text style={styles.dishDiscountText}>Extra discount</Text>
                </View>
              )}
              <TouchableOpacity style={styles.heartButton}>
                <Ionicons name="heart-outline" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.dishInfo}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>
                  Rp {(dish.discountPrice || dish.originalPrice).toLocaleString("id-ID")}
                </Text>
                {dish.hasDiscount && dish.originalPrice !== dish.discountPrice && (
                  <Text style={styles.originalPrice}>Rp {dish.originalPrice.toLocaleString("id-ID")}</Text>
                )}
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(dish)}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  )

  // Mostrar contenido según la tab activa
  const renderTabContent = () => {
    switch (activeTab) {
      case "Popular":
        return <PopularDishes />
      case "Appetizers":
        return (
          <View style={styles.dishesSection}>
            <Text style={styles.sectionTitle}>Appetizers</Text>
            <Text style={styles.comingSoon}>Coming soon...</Text>
          </View>
        )
      case "Main Course":
        return (
          <View style={styles.dishesSection}>
            <Text style={styles.sectionTitle}>Main Course</Text>
            <Text style={styles.comingSoon}>Coming soon...</Text>
          </View>
        )
      case "Desserts":
        return (
          <View style={styles.dishesSection}>
            <Text style={styles.sectionTitle}>Desserts</Text>
            <Text style={styles.comingSoon}>Coming soon...</Text>
          </View>
        )
      case "Beverages":
        return (
          <View style={styles.dishesSection}>
            <Text style={styles.sectionTitle}>Beverages</Text>
            <Text style={styles.comingSoon}>Coming soon...</Text>
          </View>
        )
      default:
        return <PopularDishes />
    }
  }

  const totalItems = getTotalItems()

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
          <TopNavigation />
        </View>

        <RestaurantInfo />
        <DiscountSection />
        <MenuTabs />
        {renderTabContent()}
      </ScrollView>

      {totalItems > 0 && (
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
          <View style={styles.cartButtonContent}>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
            <Text style={styles.cartButtonText}>View Cart</Text>
            <Ionicons name="bag" size={20} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  imageContainer: {
    position: "relative",
  },
  restaurantImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  topNavigation: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  navButton: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 8,
  },
  infoCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cuisineType: {
    fontSize: 16,
    color: "#777",
    marginBottom: 12,
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  address: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  seeOnMaps: {
    color: "#FF4500",
    fontWeight: "600",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginTop: 2,
  },
  deliveryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  deliverySubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  changeLocation: {
    color: "#FF4500",
    fontWeight: "600",
    fontSize: 14,
  },
  discountSection: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  discountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discountCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  discountIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  discountTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  discountDescription: {
    fontSize: 12,
    color: "#777",
  },
  tabsContainer: {
    backgroundColor: "white",
    paddingVertical: 16,
    marginTop: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF4500",
  },
  tabText: {
    fontSize: 16,
    color: "#777",
  },
  activeTabText: {
    color: "#FF4500",
    fontWeight: "bold",
  },
  dishesSection: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 8,
    marginBottom: 100, // Espacio para el botón del carrito
  },
  dishesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dishCard: {
    width: (width - 60) / 2,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dishImageContainer: {
    position: "relative",
  },
  dishImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  dishDiscountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#e0f7fa",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dishDiscountText: {
    fontSize: 10,
    color: "#00838f",
    fontWeight: "500",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
  },
  dishInfo: {
    padding: 12,
  },
  dishName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  discountPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF4500",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#777",
    textDecorationLine: "line-through",
  },
  addButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  comingSoon: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 40,
  },
  cartButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#E94864",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cartButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
})

export default RestaurantDetailScreen
