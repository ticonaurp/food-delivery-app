// components/CheckoutScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function CheckoutScreen({ route }) {
  const { cartItems } = route.params;

  const total = cartItems.reduce((sum, item) => sum + item.precio, 0);

  return (
    <View>
      <Text>Resumen del Pedido</Text>
      {cartItems.map((item, index) => (
        <Text key={index}>{item.nombre} - S/ {item.precio}</Text>
      ))}
      <Text>Total: S/ {total}</Text>
    </View>
  );
}