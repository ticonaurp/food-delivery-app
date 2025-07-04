import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const mockOrders = [
  {
    id: '1',
    title: 'Cheeseburger Combo',
    date: '2025-06-13T12:30:00',
    price: 8.99,
    status: 'Delivered',
    image: 'https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0',
    details: 'Incluye hamburguesa con queso, papas fritas y bebida.',
  },
  {
    id: '2',
    title: 'Chicken Teriyaki Bowl',
    date: '2025-06-12T18:45:00',
    price: 11.49,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1706703200723-822e740c7e6b?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0',
    details: 'Arroz con pollo teriyaki, vegetales salteados y salsa especial.',
  },
];

export default function OrderScreen() {
  const [loading, setLoading] = useState(true);
  const [realOrders, setRealOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { cartItems, getTotal, clearCart, addToCart } = useCart();
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const confirmOrder = () => {
    const now = new Date();
    const newOrder = {
      id: Date.now().toString(),
      title: `${cartItems.length} producto(s)`,
      date: now.toISOString(),
      price: getTotal(),
      status: 'In Progress',
      image: cartItems[0]?.image || 'https://via.placeholder.com/60',
      details: 'Pedido personalizado',
    };
    setRealOrders([newOrder, ...realOrders]);
    clearCart();
    Alert.alert('✅ Pedido confirmado', 'Tu pedido ha sido recibido.');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return { color: '#10B981' };
      case 'In Progress': return { color: '#F59E0B' };
      case 'Cancelled': return { color: '#EF4444' };
      default: return { color: '#6B7280' };
    }
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const repeatOrder = () => {
    if (selectedOrder) {
      addToCart({
        nombre: selectedOrder.title,
        precio: selectedOrder.price,
        id: Date.now(),
        image: selectedOrder.image,
        restaurantName: 'Repetido',
      });
      setShowModal(false);
      Alert.alert('✅ Agregado al carrito', 'Este pedido ha sido añadido nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.duration(400)} style={styles.title}>
        Tu Pedido
      </Animated.Text>

      {cartItems.length > 0 && (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingTop: 10 }}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Image source={{ uri: item.image || 'https://via.placeholder.com/60' }} style={styles.thumbnail} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{item.nombre}</Text>
                  <Text style={styles.cardDate}>{item.restaurantName}</Text>
                  <Text style={styles.cardPrice}>S/ {item.precio.toFixed(2)}</Text>
                  <TouchableOpacity style={styles.addIconButton}>
                    <Icon name="cart" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: S/ {getTotal().toFixed(2)}</Text>
            <TouchableOpacity
              onPress={confirmOrder}
              style={styles.confirmButton}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirmar Pedido</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Animated.Text entering={FadeInUp.delay(300)} style={[styles.title, { marginTop: 30 }]}>Órdenes anteriores</Animated.Text>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
        </View>
      ) : (
        <FlatList
          data={[...realOrders, ...mockOrders]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => openDetails(item)}>
              <Animated.View entering={ZoomIn.delay(index * 100)} style={styles.cardContainer}>
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
                  <Text style={[styles.cardStatus, getStatusColor(item.status)]}>{item.status}</Text>
                  <Text style={styles.cardPrice}>S/ {item.price.toFixed(2)}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.floatingCartButton}
          onPress={() => navigation.navigate('Order')}
        >
          <Icon name="cart-outline" size={28} color="white" />
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalle del Pedido</Text>
            <ScrollView>
              <Image source={{ uri: selectedOrder?.image }} style={styles.modalImage} />
              <Text style={styles.modalText}>Producto: {selectedOrder?.title}</Text>
              <Text style={styles.modalText}>Fecha: {formatDate(selectedOrder?.date)}</Text>
              <Text style={styles.modalText}>Estado: {selectedOrder?.status}</Text>
              <Text style={styles.modalText}>Total: S/ {selectedOrder?.price.toFixed(2)}</Text>
              <Text style={styles.modalText}>Detalles: {selectedOrder?.details}</Text>
            </ScrollView>
            <TouchableOpacity onPress={repeatOrder} style={[styles.modalCloseButton, { backgroundColor: '#10B981' }]}>
              <Text style={{ color: 'white' }}>Repetir pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
              <Text style={{ color: 'white' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
    position: 'relative',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  cardDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  cardStatus: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#E94864',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  floatingCartButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#E94864',
    borderRadius: 30,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#E94864',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addIconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E94864',
    padding: 6,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    marginVertical: 4,
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 12,
    backgroundColor: '#E94864',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});
