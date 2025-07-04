// __tests__/PlatoCard.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import PlatoCard from '../components/PlatoCard';

test('muestra nombre y precio del plato', () => {
  const plato = {
    nombre: 'Lomo Saltado',
    precio: 25,
    imagen: 'https://ejemplo.com/lomo.jpg',
    restaurantName: 'El Sabor',
  };

  const { getByText } = render(<PlatoCard plato={plato} />);
  expect(getByText('Lomo Saltado')).toBeTruthy();
  expect(getByText('S/ 25')).toBeTruthy();
});