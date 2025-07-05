"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFilteredDishes, getCategoryStats } from "../data/restaurants";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - 20 * 2 - 12) / 2;

export default function DailyDishes({
  dailyDishes,
  additionalDishes,
  showMoreDishes,
  setShowMoreDishes,
}) {
  const navigation = useNavigation();
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    loadCategoryStats();
  }, []);

  const loadCategoryStats = () => {
    const stats = getCategoryStats();
    setCategoryStats(stats);
  };

  const updatedDailyDishes = [
    {
      title: "Favoritos del Cliente",
      count: categoryStats.favoritosCliente || dailyDishes[0]?.count || "0",
      color: "#f59e0b",
      filterType: "favoritosCliente",
    },
    {
      title: "Bebidas",
      count: categoryStats.bebidas || dailyDishes[1]?.count || "0",
      color: "#f94a7a",
      filterType: "bebidas",
    },
    {
      title: "Comida Rápida",
      count: categoryStats.comidaRapida || dailyDishes[2]?.count || "0",
      color: "#3b5afe",
      filterType: "comidaRapida",
    },
    {
      title: "Postres",
      count: categoryStats.postres || dailyDishes[3]?.count || "0",
      color: "#3db2f5",
      filterType: "postres",
    },
  ];

  // Mostrar solo 2 si showMoreDishes es falso
  const visibleDishes = showMoreDishes ? updatedDailyDishes : updatedDailyDishes.slice(0, 2);

  const handleDailyDishPress = (dish) => {
    if (!dish.filterType) {
      Alert.alert("Próximamente", "Esta categoría estará disponible pronto.");
      return;
    }

    const filteredDishes = getFilteredDishes(dish.filterType);

    if (filteredDishes.length === 0) {
      Alert.alert("Sin resultados", `No hay platos disponibles en "${dish.title}" en este momento.`);
      return;
    }

    navigation.navigate("FilteredPlatos", {
      filterType: dish.filterType,
      title: dish.title,
      description: `${dish.count} platos disponibles`,
    });
  };

  return (
    <View style={styles.container}>
      {/* Título y botones */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Platos del Día</Text>
        <View style={styles.headerButtons}>

          <TouchableOpacity onPress={() => setShowMoreDishes(!showMoreDishes)} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              {showMoreDishes ? "Ver menos" : "Ver más"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tarjetas principales */}
      <View style={styles.dishesGrid}>
        {visibleDishes.map((dish, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dishCard, { backgroundColor: dish.color }]}
            onPress={() => handleDailyDishPress(dish)}
            activeOpacity={0.85}
          >
            <Text style={styles.dishCount}>{dish.count}</Text>
            <Text style={styles.dishTitle}>{dish.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Categorías adicionales si las hay */}
      {showMoreDishes && additionalDishes?.length > 0 && (
        <View style={styles.additionalDishes}>
          {additionalDishes.map((dish, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.additionalDishCard, { backgroundColor: dish.color }]}
              onPress={() => handleDailyDishPress(dish)}
              activeOpacity={0.85}
            >
              <Text style={styles.additionalDishCount}>{dish.count}</Text>
              <Text style={styles.additionalDishTitle}>{dish.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
      paddingBottom: 130, 

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1D1D1F",
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#FFF5F5",
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#FFE8ED",
  },
  toggleButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#E94864",
  },
  dishesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  dishCard: {
    width: CARD_SIZE,
    height: CARD_SIZE * 0.6,
    borderRadius: 16,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  dishCount: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  dishTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  additionalDishes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
    rowGap: 12,
  },
  additionalDishCard: {
    width: CARD_SIZE,
    height: CARD_SIZE * 0.6,
    borderRadius: 14,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  additionalDishCount: {
    
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  additionalDishTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
