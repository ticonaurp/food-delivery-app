// screens/ProductFilterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const sampleProducts = [
  {
    id: "1",
    name: "Sushi Deluxe",
    type: "Japanese",
    restaurant: "Sushi World",
    price: 15.99,
    image: "https://i.imgur.com/jAvHv5s.png",
  },
  {
    id: "2",
    name: "Taco Fiesta",
    type: "Mexican",
    restaurant: "Taco King",
    price: 9.49,
    image: "https://i.imgur.com/4A4tThI.png",
  },
  {
    id: "3",
    name: "Pizza Suprema",
    type: "Italian",
    restaurant: "La Pizza",
    price: 12.5,
    image: "https://i.imgur.com/UPrs1EWl.png",
  },
];

export default function ProductFilterScreen() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Products</Text>
      <FlatList
        data={sampleProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>{item.restaurant} • {item.type}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity
                onPress={() => addToCart(item)}
                style={styles.cartButton}
              >
                <Text style={styles.cartText}>+ Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Barra lateral del carrito */}
      <View style={styles.cartSidebar}>
        <Text style={styles.cartTitle}>🛒 Cart ({cart.length})</Text>
        {cart.map((item, index) => (
          <Text key={index} style={styles.cartItem}>
            {item.name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  image: { width: 100, height: 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
  details: { flex: 1, padding: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  info: { color: "#666", fontSize: 12 },
  price: { color: "#00C851", fontWeight: "bold", marginTop: 5 },
  cartButton: {
    marginTop: 8,
    backgroundColor: "#ff4444",
    padding: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  cartText: { color: "white", fontWeight: "bold" },
  cartSidebar: {
    position: "absolute",
    right: 0,
    top: 60,
    bottom: 0,
    width: 140,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 4,
  },
  cartTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  cartItem: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
});
