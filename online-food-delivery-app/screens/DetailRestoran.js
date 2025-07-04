// src/screens/RestaurantDetail.js
import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartContext";

const RestaurantDetail = ({ route }) => {
  const { restaurant } = route.params;
  const { addToCart } = useContext(CartContext);

  const renderDish = ({ item }) => (
    <View style={styles.dishCard}>
      <Image source={item.image} style={styles.dishImage} />
      <View style={styles.dishContent}>
        <Text style={styles.dishTitle}>{item.title}</Text>
        <Text style={styles.dishPrice}>S/ {item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(item)}
        >
          <Ionicons name="cart" size={16} color="#fff" />
          <Text style={styles.addButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{restaurant.title}</Text>
      <FlatList
        data={restaurant.dishes} // Asegúrate de que los platos estén en los datos del restaurante
        renderItem={renderDish}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  dishCard: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
  },
  dishImage: {
    width: 100,
    height: 100,
  },
  dishContent: {
    flex: 1,
    padding: 12,
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  dishPrice: {
    fontSize: 14,
    color: "#10B981",
    marginVertical: 4,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#E94864",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
});

export default RestaurantDetail;