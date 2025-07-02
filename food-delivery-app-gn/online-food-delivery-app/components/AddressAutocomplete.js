import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';

const GOOGLE_API_KEY = Constants.expoConfig.extra.googleMapsApiKey;

export default function AddressAutocomplete({ onPlaceSelected }) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedInput, setDebouncedInput] = useState('');

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(handler);
  }, [input]);

  useEffect(() => {
    if (debouncedInput.length >= 3) {
      fetchSuggestions(debouncedInput);
    } else {
      setResults([]);
    }
  }, [debouncedInput]);

  const fetchSuggestions = async (text) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          text
        )}&key=${GOOGLE_API_KEY}&language=es&types=address`
      );
      const json = await res.json();

      console.log('🔎 Autocomplete results:', json);

      if (json.status === 'OK') {
        setResults(json.predictions || []);
      } else {
        console.warn('❌ Error en Autocomplete:', json.status, json.error_message);
        setResults([]);
      }
    } catch (err) {
      console.error('🔥 Error al consultar autocomplete:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (placeId, description) => {
    setResults([]);
    setInput(description);

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const json = await res.json();

      console.log('📍 Place details:', json);

      if (json.status === 'OK') {
        const location = json.result.geometry.location;
        onPlaceSelected({
          coords: {
            latitude: location.lat,
            longitude: location.lng,
          },
          address: description,
        });
      } else {
        console.warn('❌ Error al obtener detalles:', json.status);
      }
    } catch (err) {
      console.error('🔥 Error al obtener detalles del lugar:', err);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Escribe tu dirección"
        style={styles.input}
        placeholderTextColor="#999"
      />

      {loading && <ActivityIndicator size="small" color="#666" style={{ marginTop: 6 }} />}

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.result}
              onPress={() => handleSelect(item.place_id, item.description)}
            >
              <Text style={styles.resultText}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  result: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 15,
    color: '#333',
  },
});
