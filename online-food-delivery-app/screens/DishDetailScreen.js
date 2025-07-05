import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartContext";

const DishDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { dish } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={dish.image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{dish.name}</Text>
          <Text style={styles.description}>{dish.description}</Text>
          <Text style={styles.price}>
  {dish.price !== undefined ? `S/ ${dish.price.toFixed(2)}` : "Precio no disponible"}
</Text>

        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addToCart(dish);
          navigation.goBack();
        }}
      >
        <Ionicons name="cart" size={18} color="#fff" />
        <Text style={styles.addButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 240,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#10B981",
  },
  addButton: {
    backgroundColor: "#E94864",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});

export default DishDetailScreen;