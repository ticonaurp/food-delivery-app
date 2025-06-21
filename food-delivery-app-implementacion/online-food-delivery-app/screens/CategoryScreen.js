// screens/CategoryScreen.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

// 🔹 Lista de platos con imágenes REALES
const dishes = [
  {
    id: '1',
    title: 'Pizza Pepperoni',
    category: 'Pizza',
    image: 'https://i.pinimg.com/736x/47/01/a5/4701a5bca5a98a06770921c031f974b8.jpg',
  },
  {
    id: '2',
    title: 'Pizza Margarita',
    category: 'Pizza',
    image: 'https://t4.ftcdn.net/jpg/13/74/45/89/360_F_1374458987_GeVuTEU2VLC7hzv2yfIt1AFwzHps1zLW.jpg',
  },
  {
    id: '3',
    title: 'Sushi Variado',
    category: 'Sushi',
    image: 'https://myrecipeify.com/wp-content/uploads/2024/10/Chicken-Tempura-Role-8.webp',
  },
  {
    id: '4',
    title: 'Tacos al pastor',
    category: 'Tacos',
    image: 'https://www.thefoodinmybeard.com/content/taco/whitepeople/wpt10.jpg',
  },
  {
    id: '5',
    title: 'Tallarines con huevo',
    category: 'Tallarines',
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg?quality=90&resize=556,505',
  },
];

const CategoryScreen = () => {
  const route = useRoute();
  const { category } = route.params;

  const filteredDishes = dishes.filter(
    (dish) => dish.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comidas de {category}</Text>

      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No se encontraron comidas para esta categoría.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});

export default CategoryScreen;
