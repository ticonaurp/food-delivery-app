// src/screens/ConfirmAddressScreen.js
import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { AuthContext } from '../context/AuthContext';

const screen = Dimensions.get('window');
const GOOGLE_KEY = Constants.expoConfig.extra.googleMapsApiKey;

export default function ConfirmAddressScreen({ navigation }) {
  const { loginAsGuest } = useContext(AuthContext);

  const [mapRegion, setMapRegion] = useState(null);
  const [address, setAddress] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [lastFetchedCoords, setLastFetchedCoords] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    setMapRegion(region);
    fetchAddressFromCoords(latitude, longitude);
    setLastFetchedCoords({ latitude, longitude });
  };

  const fetchAddressFromCoords = async (lat, lng) => {
    setLoadingAddress(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}&language=es`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setAddress("Dirección no disponible");
        return;
      }

      const result = data.results[0];
      const components = result.address_components;

      const street = components.find(c => c.types.includes("route"))?.long_name;
      const number = components.find(c => c.types.includes("street_number"))?.long_name;

      const shortAddress = street && number
        ? `${street} ${number}`
        : result.formatted_address || "Dirección no disponible";

      setAddress(shortAddress);
    } catch (err) {
      console.warn("Error obteniendo dirección:", err);
      setAddress("Dirección no disponible");
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleRegionChangeComplete = (region) => {
    setMapRegion(region);

    const newCoords = { latitude: region.latitude, longitude: region.longitude };

    if (
      !lastFetchedCoords ||
      getDistance(newCoords, lastFetchedCoords) > 10
    ) {
      fetchAddressFromCoords(region.latitude, region.longitude);
      setLastFetchedCoords(newCoords);
    }
  };

  function getDistance(coord1, coord2) {
    const toRad = deg => (deg * Math.PI) / 180;
    const R = 6371e3;

    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);
    const deltaLat = toRad(coord2.latitude - coord1.latitude);
    const deltaLng = toRad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  const handleConfirm = () => {
    if (!mapRegion || !address) return;

    loginAsGuest(address, {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
    });

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {mapRegion && (
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={mapRegion}
          onRegionChangeComplete={handleRegionChangeComplete}
          showsUserLocation
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
            value={address || ''}
            placeholder="Dirección"
            placeholderTextColor="#999"
            editable={false}
            style={styles.input}
          />
          {loadingAddress && <ActivityIndicator size="small" color="#E94864" />}
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
