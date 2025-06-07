import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native';

const weeklyDeals = [
  {
    id: "1",
    title: "Today's Best Deals",
    image: require("../assets/pizza1.png"),
    description: "Off up to 75%",
    gradientColors: ["#ff7a00", "#ff9a00"],
  },
  {
    id: "2",
    title: "Weekly Best Deals",
    image: require("../assets/burger.png"),
    description: "Off up to 50%",
    gradientColors: ["#f94a7a", "#f94a7a"],
  },
];

const quickMenuItems = [
  {
    label: "Near Me",
    icon: <FontAwesome6 name="map-location-dot" size={28} color="#f43f5e" />,
    route: "NearMeScreen",
  },
  {
    label: "Popular",
    icon: <FontAwesome5 name="award" size={28} color="#f43f5e" />,
    route: "PopularScreen",
  },
  {
    label: "Discount",
    icon: <MaterialIcons name="discount" size={28} color="#f43f5e" />,
    route: "DiscountScreen",
  },
  {
    label: "24 Hours",
    icon: <MaterialCommunityIcons name="hours-24" size={28} color="#f43f5e" />,
    route: "AllDayScreen",
  },
  {
    label: "Quick D",
    icon: <MaterialIcons name="delivery-dining" size={28} color="#f43f5e" />,
    route: "QuickDeliveryScreen",
  },
];

const dailyDishes = [
  {
    title: "Customer Top Picks",
    count: "321",
    color: "#f59e0b",
  },
  {
    title: "Beverages",
    count: "189",
    color: "#f94a7a",
  },
  {
    title: "Fast Food",
    count: "526",
    color: "#3b5afe",
  },
  {
    title: "Desserts",
    count: "891",
    color: "#3db2f5",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("Fetching location...");

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCurrentAddress("Permission denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync(location.coords);
      if (address) {
        setCurrentAddress(
          `${address.street || ""} ${address.name || ""}, ${address.city || ""}`
        );
      }
    };
    fetchLocation();
  }, []);

  const decreasingDots = Array(5)
    .fill(0)
    .map((_, i) => ({
      quantity: 1,
      config: { opacity: 1 - i * 0.2, color: "#FF5864", margin: 4, size: 8 },
    }));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={["#ff5f6d", "#ffc371"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.addressLabel}>Your current address</Text>
          <TouchableOpacity style={styles.addressContainer}>
            <Text style={styles.addressText}>{currentAddress}</Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color="white"
              style={{ marginLeft: 4, marginTop: 2 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <FontAwesome5 name="heart" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <Ionicons name="notifications-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#aaa" />
          <TextInput
            placeholder="What would you like to eat?"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>
        <Image
          source={{
            uri:
              "https://storage.googleapis.com/a1aa/image/adc687b5-006d-4ba1-6105-1c8ba29ccb4b.jpg",
          }}
          style={styles.headerBgImage}
          resizeMode="cover"
          blurRadius={1}
          fadeDuration={0}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        />
      </LinearGradient>

      {/* Weekly Deals Carousel */}
      <View style={{ width: "100%", paddingLeft: 16, marginTop: 12 }}>
        <Carousel
          loop
          width={320}
          height={140}
          autoPlay={true}
          data={weeklyDeals}
          onSnapToItem={setCurrentIndex}
          scrollAnimationDuration={1200}
          mode="parallax"
          modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 40 }}
          renderItem={({ item }) => (
            <LinearGradient
              colors={item.gradientColors}
              style={styles.mainDealCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.dealTextContainer}>
                <Text style={styles.mainDealTitle}>{item.title}</Text>
                <Text style={styles.mainDealSubtitle}>{item.description}</Text>
              </View>
              {item.image && (
                <Image
                  source={item.image}
                  style={styles.promoImage}
                  resizeMode="cover"
                />
              )}
            </LinearGradient>
          )}
        />
        <AnimatedDotsCarousel
          length={weeklyDeals.length}
          currentIndex={currentIndex}
          maxIndicators={5}
          interpolateOpacityAndColor={true}
          decreasingDots={decreasingDots}
          activeIndicatorConfig={{ color: "#FF5864", margin: 4, opacity: 1, size: 12 }}
          inactiveIndicatorConfig={{ color: "#FF5864", margin: 4, opacity: 0.3, size: 8 }}
          style={{ marginTop: 8 }}
        />
      </View>

      {/* Wallet and Coins */}
      <View style={styles.walletCoinsContainer}>
        <View style={styles.walletCoinsBox}>
          <FontAwesome5 name="wallet" size={20} color="#ec4899" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.walletCoinsTitle}>Your Wallet</Text>
            <Text style={styles.walletCoinsValue}>Rp699.000</Text>
          </View>
        </View>
        <View style={styles.walletCoinsBox}>
          <FontAwesome5 name="coins" size={20} color="#ec4899" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.walletCoinsTitle}>Your Coins</Text>
            <Text style={styles.walletCoinsValue}>1.200</Text>
          </View>
        </View>
      </View>

      {/* Quick Menu */}
      <View style={styles.quickMenu}>
        {quickMenuItems.map(({ label, icon, route }) => (
          <TouchableOpacity
            key={label}
            style={styles.quickMenuItem}
            onPress={() => navigation.navigate(route)}
          >
            {icon}
            <Text style={styles.quickMenuText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Daily Dishes Header */}
      <View style={styles.dailyHeader}>
        <Text style={styles.dailyTitle}>Daily Dishes</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Dishes Categories */}
      <View style={styles.dailyGrid}>
        {dailyDishes.map((item, i) => (
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
    backgroundColor: "#f5f5f7",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
  },
  addressLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  headerIcons: {
    position: "absolute",
    right: 16,
    top: 50,
    flexDirection: "row",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    height: 40,
    marginTop: 16,
  },
  input: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
    color: "#000",
  },
  headerBgImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 80,
    opacity: 0.15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  promoImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  walletCoinsContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 20,
  },
  walletCoinsBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRightWidth: 1,
    borderColor: "#e5e7eb",
  },
  walletCoinsTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },
  walletCoinsValue: {
    fontSize: 14,
    color: "#6b7280",
  },
  quickMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginHorizontal: 16,
  },
  quickMenuItem: {
    alignItems: "center",
    width: 70,
  },
  quickMenuText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  dailyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    alignItems: "center",
  },
  dailyTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#111827",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f43f5e",
  },
  dailyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  dishCard: {
    width: "48%",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    justifyContent: "center",
  },
  dishTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
    marginBottom: 6,
  },
  dishSubtitle: {
    fontSize: 12,
    color: "#f3f4f6",
  },
});
