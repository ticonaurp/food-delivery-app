import React from 'react';
import { render } from '@testing-library/react-native';
import QuickMenu from '../components/QuickMenu';
import { NavigationContainer } from '@react-navigation/native';

describe('QuickMenu', () => {
  const items = [
    { label: 'Sushi', icon: <></>, route: 'Category', filterType: 'sushi' },
    { label: 'Pizza', icon: <></>, route: 'Category', filterType: 'pizza' },
  ];

  it('muestra todos los botones de menú', () => {
    const { getByText } = render(
      <NavigationContainer>
        <QuickMenu quickMenuItems={items} />
      </NavigationContainer>
    );

    expect(getByText('Sushi')).toBeTruthy();
    expect(getByText('Pizza')).toBeTruthy();
  });
});