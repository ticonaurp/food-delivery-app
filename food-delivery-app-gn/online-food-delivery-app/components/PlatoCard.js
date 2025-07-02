import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PlatoCard = ({ plato }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: plato.imagen }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.name}>{plato.nombre}</Text>
        <Text style={styles.price}>S/ {plato.precio}</Text>
        <Text style={styles.restaurant}>{plato.restaurantName}</Text>
        
        {plato.popular && <Text style={styles.tag}>🔥 Popular</Text>}
        {plato.descuento && <Text style={[styles.tag, styles.descuento]}>💸 Descuento</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  price: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 4,
  },
  restaurant: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  tag: {
    marginTop: 6,
    fontSize: 12,
    color: '#F97316',
    fontWeight: '500',
  },
  descuento: {
    color: '#EF4444',
  },
});

export default PlatoCard;
