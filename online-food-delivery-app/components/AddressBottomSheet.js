import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import MapView from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const screen = Dimensions.get('window');
const GOOGLE_KEY = Constants.expoConfig.extra.googleMapsApiKey;

const AddressBottomSheet = ({ sheetRef, onAddressSelected }) => {
  const snapPoints = useMemo(() => ['75%'], []);
  const mapRef = useRef(null);

  const [mapRegion, setMapRegion] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

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
    mapRef.current?.animateToRegion(region, 1000);
  };

  const fetchAddressFromCoords = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}&language=es`
      );
      const data = await response.json();
      const result = data.results?.[0]?.formatted_address || '';
      setAddress(result);
    } catch (err) {
      console.warn('Error obteniendo dirección:', err);
    }
    setLoading(false);
  };

  const handleRegionChangeComplete = (region) => {
    setMapRegion(region);
    fetchAddressFromCoords(region.latitude, region.longitude);
  };

const confirmAddress = () => {
  if (!address || !mapRegion) return;

  onAddressSelected(
    address,
    {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
    }
  );

  sheetRef.current?.dismiss();
};


  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: '#ccc', width: 40 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: 'white',
      }}
    >
      <View style={{ flex: 1 }}>
        {mapRegion && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={mapRegion}
            onRegionChangeComplete={handleRegionChangeComplete}
            showsUserLocation
          />
        )}

        <View style={styles.pin}>
          <Ionicons name="location-sharp" size={30} color="#E94864" />
        </View>

        <TouchableOpacity style={styles.miraBtn} onPress={getCurrentLocation}>
          <Ionicons name="locate" size={22} color="#333" />
        </TouchableOpacity>

        <View style={styles.bottomContent}>
          <Text style={styles.title}>Confirma tu dirección</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="search" size={16} color="#999" style={{ marginRight: 8 }} />
            <TextInput
              value={address}
              placeholder="Dirección"
              placeholderTextColor="#999"
              editable={false}
              style={styles.input}
            />
            {loading && <ActivityIndicator size="small" color="#E94864" />}
          </View>

          <TouchableOpacity style={styles.confirmBtn} onPress={confirmAddress}>
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: screen.height * 0.3,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  pin: {
    position: 'absolute',
    top: screen.height * 0.3 / 2 - 30,
    left: screen.width / 2 - 15,
    zIndex: 10,
  },
  miraBtn: {
    position: 'absolute',
    right: 16,
    top: screen.height * 0.3 - 40,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 50,
    elevation: 4,
  },
  bottomContent: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },
  confirmBtn: {
    backgroundColor: '#E94864',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default AddressBottomSheet;
