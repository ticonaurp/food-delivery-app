import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const menuItems = [
    {
      title: "Nachos Chilli Con Carne",
      description: "Tortilla chips, cheddar, beans, guacamole, salsa, cilantro and onion.",
      price: 70000,
    },
    {
      title: "Spaghetti Aglio Olio with Chicken",
      description: "Garlic, dried chili flakes, parmesan bread crumbs.",
      price: 39000,
      originalPrice: 70000,
    },
    {
      title: "Bacon Mac & Cheese",
      description: "Macaroni tossed in cheese and choice of bacon.",
      price: 89000,
    },
    {
      title: "Chicken Lollipop",
      description: "Lollipop shaped chicken served with house made hot sauce.",
      price: 189000,
      originalPrice: 220000,
    },
    {
      title: "Salmon with Beurre Blanc",
      description: "Seared salmon served with butter sauce & seasonal vegetables.",
      price: 320000,
    },
  ];

const DetailRestoran = ({ route }) => {
  const { restaurant } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text>{restaurant.description}</Text>
      <Text>Rating: {restaurant.rating} ({restaurant.reviews} reviews)</Text>
      <Text>Distance: {restaurant.distance}</Text>
      <Text>Delivery: {restaurant.deliveryTime}</Text>
      <Text>Promo: {restaurant.promo}</Text>
      <Text>Free Delivery: {restaurant.freeDelivery ? 'Yes' : 'No'}</Text>

      <Text style={styles.menuTitle}>Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Rp{item.price.toLocaleString('id-ID')}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>
                Rp{item.originalPrice.toLocaleString('id-ID')}
              </Text>
            )}
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  menuTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 16 },
  menuItem: { marginBottom: 16, backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8 },
  menuItemTitle: { fontSize: 16, fontWeight: 'bold' },
  originalPrice: { textDecorationLine: 'line-through', color: 'grey' },
  addButton: { backgroundColor: '#FFCCCC', padding: 8, borderRadius: 8, marginTop: 4, alignItems: 'center' },
  addButtonText: { color: '#000' },
});

export default DetailRestoran;
