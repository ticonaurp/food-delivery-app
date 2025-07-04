import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const sugerenciasMock = [
  {
    id: '11',
    nombre: 'Ensalada Fresca',
    tipo: 'Plato',
    precio: 10.0,
    image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/salad-1238256_1280.jpg',
  },
  {
    id: '12',
    nombre: 'Limonada Natural',
    tipo: 'Bebida',
    precio: 6.0,
    image: 'https://images.unsplash.com/photo-1505253210344-cb6f17d8d9a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '13',
    nombre: 'Brownie con Helado',
    tipo: 'Plato',
    precio: 9.5,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
  },
];

export default function CartDetailScreen() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigation = useNavigation();

  const addItemAgain = (item) => {
    addToCart(item);
  };

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio, 0).toFixed(2);
  };

  const groupedSuggestions = sugerenciasMock.reduce((acc, item) => {
    if (!acc[item.tipo]) acc[item.tipo] = [];
    acc[item.tipo].push(item);
    return acc;
  }, {});

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.nombre}</Text>
        <Text style={styles.cartItemPrice}>S/ {item.precio.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityButtons}>
        <TouchableOpacity onPress={() => removeFromCart(item)}>
          <AntDesign name="minuscircleo" size={24} color="#FF4D6D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addItemAgain(item)} style={{ marginLeft: 12 }}>
          <AntDesign name="pluscircleo" size={24} color="#FF4D6D" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSuggestionSection = (title, data) => (
    <View key={title} style={{ marginBottom: 20 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.suggestionCard}
          onPress={() => addItemAgain(item)}
        >
          <Image source={{ uri: item.image }} style={styles.suggestionImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.suggestionName}>{item.nombre}</Text>
            <Text style={styles.suggestionPrice}>S/ {item.precio.toFixed(2)}</Text>
          </View>
          <AntDesign name="pluscircle" size={24} color="#4CAF50" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const handlePay = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de pagar.');
    } else {
      navigation.navigate('PaymentOptions');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Botón de retroceso */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={28} color="#FF4D6D" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Detalle de tu pedido</Text>

        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No has agregado platos aún.</Text>
          </View>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => item.nombre + index}
            renderItem={renderCartItem}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        )}

        <Text style={styles.sectionTitle}>Sugerencias para ti</Text>
        {Object.keys(groupedSuggestions).map((tipo) =>
          renderSuggestionSection(tipo, groupedSuggestions[tipo])
        )}
      </ScrollView>

      {/* Footer fijo */}
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>S/ {calcularTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    fontStyle: 'italic',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cartItemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
  },
  suggestionImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  suggestionPrice: {
    fontSize: 14,
    color: '#666',
  },
  footerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF4D6D',
  },
  payButton: {
    backgroundColor: '#FF4D6D',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
