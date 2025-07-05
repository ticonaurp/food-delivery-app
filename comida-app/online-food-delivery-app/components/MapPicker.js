// components/MapPicker.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const screen = Dimensions.get('window');
const GOOGLE_KEY = Constants.expoConfig.extra.googleMapsApiKey;

const MapPicker = ({ onConfirm }) => {
  const [mapRegion, setMapRegion] = useState(null);
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permiso de ubicación denegado');
    return;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  const { latitude, longitude } = location.coords;

  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  //  Esto centra el mapa exactamente en el punto azul
  mapRef.current?.animateToRegion(region, 1000);

  //  También actualiza el pin (centro del mapa) y la dirección
  setMapRegion(region);
  fetchAddressFromCoords(latitude, longitude);
};




  const fetchAddressFromCoords = async (lat, lng) => {
    setLoadingAddress(true);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}&language=es`
      );
      const json = await res.json();
      const result = json.results?.[0]?.formatted_address || '';
      setAddress(result);
    } catch (e) {
      console.warn(e);
    }
    setLoadingAddress(false);
  };

  const handleRegionChangeComplete = (region) => {
    setMapRegion(region);
    fetchAddressFromCoords(region.latitude, region.longitude);
  };

  return (
    <View style={{ flex: 1 }}>
      {mapRegion && (
        <MapView
  ref={mapRef}
  style={StyleSheet.absoluteFill}
  initialRegion={mapRegion}
  onRegionChangeComplete={handleRegionChangeComplete}
  showsUserLocation={true} // 👈 esto muestra el punto azul
  showsMyLocationButton={false} // (evita conflicto con la mira personalizada)
  followsUserLocation={false}
/>

      )}

      <View style={styles.pinContainer}>
        <Ionicons name="location-sharp" size={36} color="#101828" />
      </View>

      <TouchableOpacity style={styles.myLocationBtn} onPress={getCurrentLocation}>
        <Ionicons name="locate" size={26} color="#333" />
      </TouchableOpacity>

      <View style={styles.bottomCard}>
        <Text style={styles.title}>Confirma tu dirección</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="search" size={18} color="#999" style={{ marginRight: 8 }} />
          <TextInput
            value={address}
            placeholder="Dirección"
            placeholderTextColor="#999"
            editable={false}
            style={styles.input}
          />
          {loadingAddress && <ActivityIndicator size="small" color="#E94864" />}
        </View>

        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => {
            onConfirm({ coords: mapRegion, address });
          }}
        >
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapPicker;

const styles = StyleSheet.create({
  pinContainer: {
    position: 'absolute',
    top: screen.height * 0.45,
    left: screen.width / 2 - 18,
    zIndex: 10,
  },
  myLocationBtn: {
    position: 'absolute',
    right: 16,
    bottom: screen.height * 0.35,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 4,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101828',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: '#101828',
    fontSize: 16,
  },
  confirmBtn: {
    backgroundColor: '#E94864',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
