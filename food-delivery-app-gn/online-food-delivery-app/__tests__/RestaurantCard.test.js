import React from 'react';
import { render } from '@testing-library/react-native';
import RestaurantCard from '../components/RestaurantCard';
import { NavigationContainer } from '@react-navigation/native';

describe('RestaurantCard', () => {
  const restaurant = {
    name: 'Sushi Kyu',
    rating: 4.8,
    description: 'Auténtico sushi japonés',
    deliveryTime: '20 min',
    distance: '2.5',
    freeDelivery: true,
    promo: '10% off',
    imageUrl: { uri: 'https://ejemplo.com/sushi.jpg' },
  };

  it('muestra nombre, rating y descripción', () => {
    const { getByText } = render(
      <NavigationContainer>
        <RestaurantCard item={restaurant} />
      </NavigationContainer>
    );

    expect(getByText('Sushi Kyu')).toBeTruthy();
    expect(getByText('⭐ 4.8')).toBeTruthy();
    expect(getByText('Auténtico sushi japonés')).toBeTruthy();
    expect(getByText('20 min')).toBeTruthy();
    expect(getByText('• 2.5 km')).toBeTruthy();
    expect(getByText('• 🚚 Gratis')).toBeTruthy();
    expect(getByText('🎁 10% off')).toBeTruthy();
  });
});