import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailRestoran', { restaurant: item })}
      style={styles.card}
    >
      <Image source={{ uri: item.imageUrl.uri || item.imageUrl }} style={styles.image} />

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{item.deliveryTime}</Text>
          <Text style={styles.metaText}>• {item.distance} km</Text>
          {item.freeDelivery && <Text style={styles.freeDelivery}>• 🚚 Gratis</Text>}
        </View>

        {item.promo && (
          <Text style={styles.promoText}>🎁 {item.promo}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 10,
  },
  rating: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#4B5563',
    marginRight: 10,
  },
  freeDelivery: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
  },
  promoText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '600',
    marginTop: 4,
  },
});

export default RestaurantCard;
