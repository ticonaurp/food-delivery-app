import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddressAutocomplete from '../components/AddressAutocomplete';

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      googleMapsApiKey: 'FAKE_KEY_FOR_TESTS'
    }
  }
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        status: 'OK',
        predictions: [
          { place_id: '123', description: 'Av. Los Álamos 123' },
        ],
      }),
  })
);

describe('AddressAutocomplete', () => {
  it('muestra sugerencias cuando se escribe dirección', async () => {
    const onPlaceSelected = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <AddressAutocomplete onPlaceSelected={onPlaceSelected} />
    );

    const input = getByPlaceholderText('Escribe tu dirección');
    fireEvent.changeText(input, 'Av. Los');

    await waitFor(() => {
      expect(getByText('Av. Los Álamos 123')).toBeTruthy();
    });
  });
});