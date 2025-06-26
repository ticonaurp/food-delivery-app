// screens/ProductListScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const foodProducts = [
  {
    id: '1',
    name: 'Pizza Pepperoni',
    price: 18.99,
    image: 'https://i.pinimg.com/736x/47/01/a5/4701a5ab48b59c3dc1a6b8f0fa2e9ec2.jpg',
  },
  {
    id: '2',
    name: 'Hamburguesa Clásica',
    price: 14.99,
    image: 'https://i.pinimg.com/736x/37/0e/27/370e279453ec97e8c86c799e7dcb5b47.jpg',
  },
  {
    id: '3',
    name: 'Sushi Variado',
    price: 22.49,
    image: 'https://i.pinimg.com/736x/af/8a/9d/af8a9d5f09ec9f9e5e86510e26f8cfb0.jpg',
  },
  {
    id: '4',
    name: 'Pollo a la brasa',
    price: 20.00,
    image: 'https://i.pinimg.com/736x/f0/43/95/f04395e2467f6ae52c0425dc69e26038.jpg',
  },
  {
    id: '5',
    name: 'Ceviche Mixto',
    price: 19.00,
    image: 'https://i.pinimg.com/736x/f1/9e/99/f19e997aec8303c204f7a9625ae0995f.jpg',
  },
];

export default function ProductListScreen() {
  const handleAddToCart = (product) => {
    alert(`"${product.name}" fue añadido al carrito`);
    // Aquí puedes añadir lógica con Context o AsyncStorage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos de Comida</Text>
      <FlatList
        data={foodProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>S/. {item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
              <Text style={styles.buttonText}>Añadir al carrito</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#E94864',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    marginVertical: 6,
    color: '#888',
  },
  button: {
    backgroundColor: '#E94864',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
