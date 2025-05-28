import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import WeeklyDealsCarousel from "./components/WeeklyDealsCarousel";
import QuickMenu from "./components/QuickMenu";

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("Fetching location...");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCurrentAddress("Permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync(location.coords);

      if (address) {
        setCurrentAddress(`${address.street || ""} ${address.name || ""}, ${address.city || ""}`);
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.addressText}>{currentAddress}</Text>
          <View style={{ flexDirection: "row", marginLeft: "auto" }}>
            <Ionicons name="heart-outline" size={20} color="#fff" style={{ marginHorizontal: 8 }} />
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#aaa" />
          <TextInput
            placeholder="What would you like to eat?"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>
      </View>

      <WeeklyDealsCarousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />

      <View style={styles.walletRow}>
        <View style={[styles.walletCard, { backgroundColor: '#FEF3C7' }]}>
          <Ionicons name="wallet-outline" size={30} color="#F59E0B" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.walletText}>Your Wallet</Text>
            <Text style={styles.walletAmount}>S/. 45.00</Text>
          </View>
        </View>
        <View style={[styles.walletCard, { backgroundColor: '#D1FAE5' }]}>
          <FontAwesome6 name="coins" size={30} color="#10B981" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.walletText}>Your Coins</Text>
            <Text style={styles.walletAmount}>1200</Text>
          </View>
        </View>
      </View>

      <QuickMenu />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#FF4D4D",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addressText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 14,
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    height: 40,
  },
  input: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  walletCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  walletText: {
    fontSize: 12,
    color: '#6B7280',
  },
  walletAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});
