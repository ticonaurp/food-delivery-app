import React from 'react';
import { render } from '@testing-library/react-native';
import CheckoutScreen from '../components/CheckoutScreen';

describe('CheckoutScreen', () => {
  const cartItems = [
    { nombre: 'Pizza', precio: 30 },
    { nombre: 'Sushi', precio: 25 },
  ];

  const route = {
    params: {
      cartItems,
    },
  };

  it('muestra resumen con total y productos', () => {
    const { getByText } = render(<CheckoutScreen route={route} />);

    expect(getByText('Resumen del Pedido')).toBeTruthy();
    expect(getByText('Pizza - S/ 30')).toBeTruthy();
    expect(getByText('Sushi - S/ 25')).toBeTruthy();
    expect(getByText('Total: S/ 55')).toBeTruthy();
  });
});