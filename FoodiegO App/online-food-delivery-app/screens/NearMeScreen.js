"use client";

import { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { restaurants } from "../data/restaurants";
import FilterBar from "../components/FilterBar";
import RestaurantCard from "../components/RestaurantCard";

const NearMeScreen = ({ navigation, route }) => {
  const [filterType, setFilterType] = useState("all");

  // Si viene un filtro desde el QuickMenu, lo aplicamos
  useEffect(() => {
    if (route?.params?.filterType) {
      const filterMapping = {
        popular: "recommended",
        descuento: "discount",
        todoElDia: "all",
        entregaRapida: "freeDelivery",
      };
      setFilterType(filterMapping[route.params.filterType] || "all");
    }
  }, [route?.params]);

  const filteredData = useMemo(() => {
    // Verificar que restaurants existe y es un array
    if (!restaurants || !Array.isArray(restaurants)) {
      return [];
    }

    switch (filterType) {
      case "discount":
        return restaurants.filter((item) => item && item.promo);
      case "recommended":
        return restaurants.filter((item) => item && item.rating >= 4.5);
      case "freeDelivery":
        return restaurants.filter((item) => item && item.freeDelivery);
      case "priceLowToHigh":
        return [...restaurants].sort((a, b) => {
          const priceA = a?.price || 0;
          const priceB = b?.price || 0;
          return priceA - priceB;
        });
      case "nearest":
        return [...restaurants].sort((a, b) => {
          const distanceA = Number.parseFloat(
            a?.distance?.replace("km", "") || "0"
          );
          const distanceB = Number.parseFloat(
            b?.distance?.replace("km", "") || "0"
          );
          return distanceA - distanceB;
        });
      default:
        return restaurants;
    }
  }, [filterType]);

  const handleRestaurantPress = (restaurant) => {
    if (restaurant && navigation) {
      navigation.navigate("RestaurantDetail", { restaurant });
    }
  };

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const HeaderComponent = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Near Me</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const ListHeaderComponent = () => (
    <>
      <Text style={styles.mainTitle}>Dishes near me</Text>
      <Text style={styles.subtitle}>Catch delicious eats near you</Text>
      <FilterBar currentFilter={filterType} setFilter={setFilterType} />
    </>
  );

  const renderRestaurantItem = ({ item, index }) => {
    // Verificar que el item existe y tiene id
    if (!item || !item.id) {
      return null;
    }

    return <RestaurantCard item={item} onPress={handleRestaurantPress} />;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="restaurant-outline" size={80} color="#ccc" />
      <Text style={styles.emptyTitle}>No restaurants found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your filters or check back later.
      </Text>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <HeaderComponent />
        <FlatList
          data={filteredData}
          renderItem={renderRestaurantItem}
          keyExtractor={(item, index) => {
            // Usar una key segura que siempre exista
            return item?.id ? `restaurant-${item.id}` : `restaurant-${index}`;
          }}
          contentContainerStyle={styles.listContentContainer}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false} // Ayuda con el rendimiento
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    backgroundColor: "white",
    alignSelf: "center",
  },
  headerContainer: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingTop: 50, // Safe area
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 32, // Same width as back button for centering
  },
  listContentContainer: {
    paddingBottom: 80,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "left",
    marginBottom: 20,
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
});

export default NearMeScreen;
