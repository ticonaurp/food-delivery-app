
"use client";

import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartContext } from "../context/CartContext";
import { getFilteredDishes } from "../data/restaurants";
import { formatearSoles } from "../utils/currencyUtils"

export default function FilteredPlatosScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { filterType, title } = route.params || {};

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, canAddItem, selectedRestaurant } = useContext(CartContext);

  useEffect(() => {
    loadDishes();
  }, [filterType]);

  const loadDishes = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const filteredDishes = getFilteredDishes(filterType);
      setDishes(filteredDishes);
    } catch (error) {
      console.error(" Error loading dishes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (dish) => {
    // ELIMINAMOS TODOS LOS ALERTS MOLESTOS
    // Solo agregar al carrito silenciosamente

    if (!canAddItem(dish.restaurant)) {
      // Solo mostrar alert si hay conflicto de restaurante
      console.log("⚠️ Different restaurant, but adding anyway");
    }

    // Agregar al carrito sin interrupciones
    addToCart(dish, dish.restaurant);

    // NO más alerts de "Added to cart"
    // NO más "Continue shopping"
    //  Experiencia fluida y sin interrupciones
  };

  const renderDishItem = ({ item: dish }) => (
    <View style={styles.dishCard}>
      <Image source={{ uri: dish.image }} style={styles.dishImage} />

      <View style={styles.dishInfo}>
        <View style={styles.dishHeader}>
          <Text style={styles.dishName}>{dish.name}</Text>
          {dish.hasDiscount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -
                {Math.round(
                  ((dish.originalPrice - dish.discountPrice) /
                    dish.originalPrice) *
                    100
                )}
                %
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.dishDescription} numberOfLines={2}>
          {dish.description}
        </Text>

        <View style={styles.restaurantInfo}>
          <Ionicons name="storefront-outline" size={14} color="#8E8E93" />
          <Text style={styles.restaurantName}>{dish.restaurant.name}</Text>
          <Text style={styles.restaurantDistance}>
            • {dish.restaurant.distance}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            {dish.hasDiscount ? (
              <>
                <Text style={styles.originalPrice}>
                  {formatearSoles(dish.originalPrice)}
                </Text>
                <Text style={styles.discountPrice}>
                  {formatearSoles(dish.discountPrice)}
                </Text>
              </>
            ) : (
              <Text style={styles.price}>
                {formatearSoles(dish.originalPrice)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(dish)}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
        </TouchableOpacity>
        <Text style={styles.title}>{title || "Platos Filtrados"}</Text>
        <View style={styles.placeholder} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando platos...</Text>
        </View>
      ) : (
        <FlatList
          data={dishes}
          renderItem={renderDishItem}
          keyExtractor={(item) => item.uniqueId}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="restaurant-outline" size={60} color="#8E8E93" />
              <Text style={styles.emptyTitle}>No hay platos disponibles</Text>
              <Text style={styles.emptySubtitle}>Intenta con otro filtro</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
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
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#8E8E93",
  },
  listContainer: {
    padding: 16,
  },
  dishCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  dishImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#F2F2F7",
  },
  dishInfo: {
    padding: 16,
  },
  dishHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    flex: 1,
  },
  discountBadge: {
    backgroundColor: "#FF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  dishDescription: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    marginBottom: 12,
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 4,
  },
  restaurantDistance: {
    fontSize: 14,
    color: "#8E8E93",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  originalPrice: {
    fontSize: 14,
    color: "#8E8E93",
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  addButton: {
    backgroundColor: "#E94864",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
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
});
