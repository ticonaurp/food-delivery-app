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
import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { TouchableOpacity } from "react-native";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

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
    image: require("../../assets/burger.png"),
    description: "Off up to 50%",
  },
  {
    id: "3",
    title: "Sushi Special",
    image: require("../../assets/sushi.png"),
    description: "Off up to 30%",
  },
];

const quickMenuItems = [
  {
    label: "Near me",
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
    label: "Quick Delivery",
    icon: <MaterialIcons name="delivery-dining" size={28} color="#f43f5e" />,
    route: "QuickDeliveryScreen",
  },
];

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

  const navigation = useNavigation();

  const decreasingDots = Array(5)
    .fill(0)
    .map((_, i) => ({
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
      {/* Menú rosa en la parte superior */}
      <View style={styles.header}>
        <Text style={styles.addressText}>{currentAddress}</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          <FontAwesome5 name="heart" size={24} color="#fff" style={{ marginLeft: 10 }} />
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

      {weeklyDeals.length > 0 && (
        <View
          style={{ width: "100%", paddingLeft: 16, alignItems: "flex-start" }}
        >
          <Carousel
            loop
            width={320}
            height={140}
            autoPlay={true}
            data={weeklyDeals}
            onSnapToItem={(index) => setCurrentIndex(index)}
            scrollAnimationDuration={1200}
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
                  <Text style={styles.mainDealSubtitle}>
                    {item.description}
                  </Text>
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

      <View style={styles.dailyGrid}>
        <Text style={styles.sectionTitle}>Daily Dishes</Text>
        {[
          { title: "Customer Top Picks", count: "321", color: "#f59e0b" },
          { title: "Fast Food", count: "526", color: "#3b82f6" },
          { title: "Beverages", count: "189", color: "#fb923c" },
          { title: "Desserts", count: "891", color: "#06b6d4" },
        ].map((item, i) => (
          <View
            key={i}
            style={[styles.dishCard, { backgroundColor: item.color }]}
          >
            <Text style={styles.dishTitle}>{item.title}</Text>
            <Text style={styles.dishSubtitle}>
              {item.count} Restaurant Already
            </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: "row",
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
    width: 110,
    height: 110,
    overflow: "hidden",
    borderRadius: 60,
  },
  promoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
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
  dailyGrid: {
    marginTop: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
    width: "100%",
  },
  dishCard: {
    width: "48%",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    justifyContent: "center",
  },
  dishTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    marginBottom: 6,
  },
  dishSubtitle: {
    fontSize: 12,
    color: "#F3F4F6",
  },
});
