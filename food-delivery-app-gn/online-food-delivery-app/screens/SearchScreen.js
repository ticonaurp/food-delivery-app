import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const platosMock = [
  {
    id: '1',
    nombre: 'Pizza Napolitana',
    precio: 18.9,
    image: 'https://i.ibb.co/YdVnspq/pizza.jpg',
  },
  {
    id: '2',
    nombre: 'Hamburguesa Clásica',
    precio: 12.5,
    image: 'https://i.ibb.co/W0vbmzj/hamburguesa.jpg',
  },
  {
    id: '3',
    nombre: 'Tallarines a la Huancaína',
    precio: 15.0,
    image: 'https://i.ibb.co/CB9pVvv/huancaina.jpg',
  },
  {
    id: '4',
    nombre: 'Pollo Broaster',
    precio: 14.5,
    image: 'https://i.ibb.co/9Zw0Cq9/pollo-broaster.jpg',
  },
  {
    id: '5',
    nombre: 'Ceviche Clásico',
    precio: 20.0,
    image: 'https://i.ibb.co/ZKCTpY8/ceviche.jpg',
  },
  {
    id: '6',
    nombre: 'Chaufa de Pollo',
    precio: 16.0,
    image: 'https://i.ibb.co/xX8bwYX/arroz-chaufa.jpg',
  },
  {
    id: '7',
    nombre: 'Sushi Variado',
    precio: 28.0,
    image: 'https://i.ibb.co/TkChvKX/sushi.jpg',
  },
  {
    id: '8',
    nombre: 'Tacos Mexicanos',
    precio: 17.5,
    image: 'https://i.ibb.co/FzDM4yW/tacos.jpg',
  },
  {
    id: '9',
    nombre: 'Ensalada César',
    precio: 13.0,
    image: 'https://i.ibb.co/vwsHhCR/ensalada.jpg',
  },
  {
    id: '10',
    nombre: 'Helado de Fresa',
    precio: 7.5,
    image: 'https://i.ibb.co/Fh9vrwh/helado.jpg',
  },
];

export default function SearchScreen() {
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    setResults(
      queryText.trim().length >= 2
        ? platosMock.filter(p =>
            p.nombre.toLowerCase().includes(queryText.toLowerCase())
          )
        : platosMock
    );
  }, [queryText]);

  const addItem = (item) => {
    addToCart({
      nombre: item.nombre,
      precio: item.precio,
      image: item.image,
      restaurantName: 'Local',
    });
    // Navega a la pantalla de detalle del carrito al agregar un plato
    navigation.navigate('CartDetail');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardSubtitle}>S/ {item.precio.toFixed(2)}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => addItem(item)}>
            <Ionicons name="cart" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <TextInput
          placeholder="Buscar platos..."
          style={styles.searchInput}
          value={queryText}
          onChangeText={setQueryText}
        />
        <TouchableOpacity onPress={() => navigation.navigate('CartDetail')}>
          <View style={styles.badgeContainer}>
            <Ionicons name="cart" size={26} color="#E94864" />
            {cartItems.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// Estilos (los mantengo igual)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F3F5' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  badgeContainer: {
    marginLeft: 12,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E94864',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '600' },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: { width: 100, height: 100 },
  cardInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
  cardTitle: { fontWeight: '600', fontSize: 16, color: '#111827' },
  cardSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontSize: 12, color: '#111827' },
  addBtn: {
    backgroundColor: '#E94864',
    borderRadius: 8,
    padding: 6,
  },
});
