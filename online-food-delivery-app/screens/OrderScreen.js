import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const mockOrders = [
  {
    id: '1',
    title: 'Cheeseburger Combo',
    date: '2025-06-13T12:30:00',
    price: 8.99,
    status: 'Delivered',
    image: 'https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: '2',
    title: 'Chicken Teriyaki Bowl',
    date: '2025-06-12T18:45:00',
    price: 11.49,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1706703200723-822e740c7e6b?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function OrderScreen() {
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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

  const reorder = (order) => {
    alert(`Reordering: ${order.title}`);
  };

  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.duration(400)} style={styles.title}>
        Your Orders
      </Animated.Text>

      <Animated.Text entering={FadeInDown.delay(150).duration(400)} style={styles.subtitle}>
        Review your recent orders
      </Animated.Text>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
        </View>
      ) : mockOrders.length > 0 ? (
        <FlatList
          data={mockOrders}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: 20 }}
          renderItem={({ item, index }) => (
            <Animated.View entering={ZoomIn.delay(index * 100)} style={styles.cardContainer}>
              <Image source={{ uri: item.image }} style={styles.thumbnail} />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
                <Text style={[styles.cardStatus, getStatusColor(item.status)]}>{item.status}</Text>
                <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity onPress={() => reorder(item)}>
                <Icon name="repeat" size={24} color="#6366F1" />
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      ) : (
        <Animated.View entering={FadeInUp.delay(300)} style={styles.emptyContainer}>
          <Icon name="cart-outline" size={60} color="#9CA3AF" />
          <Text style={styles.emptyText}>You have no orders yet.</Text>
        </Animated.View>
      )}

      <Modal
        visible={!!selectedOrder}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedOrder(null)}
      >
        {/* Order details modal - can be added here */}
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
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9CA3AF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
