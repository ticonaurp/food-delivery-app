import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailRestoran', { restaurant: item })}
      style={styles.cardTouchable}
    >
      <View style={styles.card}>
        <Image source={item.imageUrl} style={styles.image} />
        <View style={styles.textContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#fff" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={{ marginLeft: 6, color: '#9CA3AF', fontSize: 12 }}>
              ({item.reviews})
            </Text>
          </View>

          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>

          <Text style={styles.detailsText}>
            Start from ${item.price} • {item.distance} km • Delivery in {item.deliveryTime}
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
            {item.promo && (
              <Text style={[styles.badge, styles.extraDiscount]}>Extra discount</Text>
            )}
            {item.freeDelivery && (
              <Text style={[styles.badge, styles.freeDelivery]}>Free delivery</Text>
            )}
          </View>
        </View>

        <View style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={20} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardTouchable: {
    marginBottom: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 13,
    color: '#4B5563',
  },
  badge: {
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginRight: 6,
    fontSize: 12,
    color: '#fff',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  extraDiscount: {
    backgroundColor: '#2563EB',
  },
  freeDelivery: {
    backgroundColor: '#F59E0B',
  },
  ratingBadge: {
    backgroundColor: '#FBBF24',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 4,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default RestaurantCard;
