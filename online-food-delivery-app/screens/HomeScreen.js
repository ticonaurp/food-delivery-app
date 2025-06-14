// src/screens/HomeScreen.js
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import {
  ScrollView,
  StyleSheet,
  Animated,
  View,
} from "react-native";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Header from "../components/Header";
import WeeklyDealsCarousel from "../components/WeeklyDealsCarousel";
import WalletCoins from "../components/WalletCoins";
import QuickMenu from "../components/QuickMenu";
import DailyDishes from "../components/DailyDishes";

const weeklyDeals = [
  {
    id: "1",
    title: "Today's Best Deals",
    image: require("../assets/pizza1.png"),
    description: "Off up to 75%",
    gradientColors: ["#FF7A00", "#FF9A00"], // naranja degradado
  },
  {
    id: "2",
    title: "Weekly Best Deals",
    image: require("../assets/burger.png"),
    description: "Off up to 50%",
    gradientColors: ["#FF4081", "#ff0000"], // rosa a rojo
  },
  {
    id: "3",
    title: "Top Picks This Week",
    image: require("../assets/sushi.png"),
    description: "Up to 30% off",
    gradientColors: ["#4facfe", "#00f2fe"], // azul claro degradado
  },
  {
    id: "4",
    title: "Hot Trending Meals",
    image: require("../assets/tacos.png"),
    description: "Exclusive deals",
    gradientColors: ["#43e97b", "#38f9d7"], // verde menta degradado
  },
  {
    id: "5",
    title: "Only for You",
    image: require("../assets/noodles.png"),
    description: "Surprise discount",
    gradientColors: ["#ff9a9e", "#fad0c4"], // rosado pastel
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

const additionalDishes = [
  {
    title: "Pizza",
    count: "150",
    color: "#3b5afe",
  },
  {
    title: "Salads",
    count: "230",
    color: "#f59e0b",
  },
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("Fetching location...");
  const [showMoreDishes, setShowMoreDishes] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const fadeInWallet = useRef(new Animated.Value(0)).current;
  const fadeInMenu = useRef(new Animated.Value(0)).current;
  const fadeInDishes = useRef(new Animated.Value(0)).current;

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

    // Sequential animation
    Animated.sequence([
      Animated.timing(fadeInWallet, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInMenu, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInDishes, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    >
      <Animated.View
        style={{
          opacity: scrollY.interpolate({
            inputRange: [0, 150],
            outputRange: [1, 0],
            extrapolate: "clamp",
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [0, -50],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Header currentAddress={currentAddress} />
        <WeeklyDealsCarousel
          weeklyDeals={weeklyDeals}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </Animated.View>

      {/* Animated WalletCoins */}
      <Animated.View
        style={{
          opacity: fadeInWallet,
          transform: [
            {
              translateY: fadeInWallet.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <WalletCoins />
      </Animated.View>

      {/* Animated QuickMenu */}
      <Animated.View
        style={{
          opacity: fadeInMenu,
          transform: [
            {
              translateY: fadeInMenu.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <QuickMenu quickMenuItems={quickMenuItems} />
      </Animated.View>

      {/* Animated DailyDishes */}
      <Animated.View
        style={{
          opacity: fadeInDishes,
          transform: [
            {
              translateY: fadeInDishes.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <DailyDishes
          dailyDishes={dailyDishes}
          additionalDishes={additionalDishes}
          showMoreDishes={showMoreDishes}
          setShowMoreDishes={setShowMoreDishes}
        />
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
});
