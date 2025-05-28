import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";

import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Promociones semanales
const weeklyDeals = [
  {
    id: "1",
    title: "Today's Best Deals",
    image: require("../../assets/pizza1.png"),
    description: "Off up to 75%",
  },
  {
    id: "2",
    title: "Weekly Best Deals",
    image: require("../../assets/pizza2.png"),
    description: "Off up to 50%",
  },
  {
    id: "3",
    title: "Sushi Special",
    image: require("../../assets/sushi.png"),
    description: "Off up to 30%",
  },
];

// Datos para Daily Dishes y sección "Already"
const dailyDishes = [
  { label: "Customer Top Picks", count: 546 },
  { label: "Fast Food", count: 546 },
  { label: "Restaurant Already", count: null },
  { label: "Beverages", count: 189 },
  { label: "Restaurant Already", count: null },
  { label: "Desserts", count: 891 },
  { label: "Restaurant Already", count: null },
];

// Quick menu con iconos
const quickMenuItems = [
  {
    label: "Near Me",
    icon: (
      <MaterialCommunityIcons
        name="map-marker-radius"
        size={20}
        color="#f43f5e"
      />
    ),
  },
  {
    label: "Popular",
    icon: <Ionicons name="flame-outline" size={20} color="#f43f5e" />,
  },
  {
    label: "Discount",
    icon: <MaterialIcons name="discount" size={20} color="#f43f5e" />,
  },
  {
    label: "24 Hours",
    icon: <FontAwesome name="clock-o" size={20} color="#f43f5e" />,
  },
  {
    label: "Quick Meals",
    icon: <MaterialIcons name="fastfood" size={20} color="#f43f5e" />,
  },
];

// ... (imports sin cambios)

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("Fetching location...");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCurrentAddress("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let [address] = await Location.reverseGeocodeAsync(location.coords);

      if (address) {
        setCurrentAddress(
          `${address.street || ""} ${address.name || ""}, ${address.city || ""}`
        );
      }
    })();
  }, []);

  const decreasingDots = Array(5).fill(0).map((_, i) => ({
    quantity: 1,
    config: {
      opacity: 1 - i * 0.2,
      color: "#FF5864",
      margin: 4,
      size: 8,
    },
  }));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.addressText}>{currentAddress}</Text>
          <View style={{ flexDirection: "row", marginLeft: "auto" }}>
            <Ionicons name="heart-outline" size={20} color="#fff" style={{ marginHorizontal: 8 }} />
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#aaa" />
          <TextInput
            placeholder="What would you like to eat?"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>
      </View>

      {/* Carrusel de Promociones */}
      {weeklyDeals.length > 0 && (
        <View style={{ width: "100%", paddingLeft: 16, alignItems: "flex-start" }}>
          <Carousel
            loop
            width={320}
            height={140}
            autoPlay={true}
            data={weeklyDeals}
            onSnapToItem={(index) => setCurrentIndex(index)}
            scrollAnimationDuration={2000}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 40,
            }}
            renderItem={({ item }) => (
              <LinearGradient
                colors={["#FFA500", "#FF4D4D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.mainDealCard}
              >
                <View style={styles.dealTextContainer}>
                  <Text style={styles.mainDealTitle}>{item.title}</Text>
                  <Text style={styles.mainDealSubtitle}>{item.description}</Text>
                </View>
                <View style={styles.promoImageContainer}>
                  <Image
                    source={item.image}
                    style={styles.promoImage}
                    resizeMode="cover"
                  />
                </View>
              </LinearGradient>
            )}
          />
          <AnimatedDotsCarousel
            length={weeklyDeals.length}
            currentIndex={currentIndex}
            maxIndicators={5}
            interpolateOpacityAndColor={true}
            decreasingDots={decreasingDots}
            activeIndicatorConfig={{
              color: "#FF5864",
              margin: 4,
              opacity: 1,
              size: 12,
            }}
            inactiveIndicatorConfig={{
              color: "#FF5864",
              margin: 4,
              opacity: 0.3,
              size: 8,
            }}
          />
        </View>
      )}

      {/* Quick Menu */}
      <View style={styles.quickMenu}>
        {quickMenuItems.map(({ label, icon }) => (
          <View key={label} style={styles.quickMenuItem}>
            {icon}
            <Text style={styles.quickMenuText}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Daily Dishes Grid */}
      <View style={styles.dailyGrid}>
        <Text style={styles.sectionTitle}>Daily Dishes</Text>
        {[
          { title: "Customer Top Picks", count: "321", color: "#f59e0b" },
          { title: "Fast Food", count: "526", color: "#3b82f6" },
          { title: "Beverages", count: "189", color: "#fb923c" },
          { title: "Desserts", count: "891", color: "#06b6d4" },
        ].map((item, i) => (
          <View key={i} style={[styles.dishCard, { backgroundColor: item.color }]}>
            <Text style={styles.dishTitle}>{item.title}</Text>
            <Text style={styles.dishSubtitle}>{item.count} Restaurant Already</Text>
          </View>
        ))}
      </View>
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
  mainDealCard: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 15,
    marginRight: 20,
    alignItems: "center",
    width: 320,
    height: 140,
    justifyContent: "space-between",
  },
  dealTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  mainDealTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  mainDealSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  },
  promoImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  promoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  quickMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  quickMenuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  quickMenuText: {
    fontWeight: "600",
    marginLeft: 6,
    color: "#f43f5e",
  },
  dailyGrid: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  dishCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  dishTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dishSubtitle: {
    color: "#fff",
    fontSize: 13,
    marginTop: 4,
  },
});

