// src/screens/HomeScreen.js
import React, { useState, useEffect, useRef, useContext } from "react";
import * as Location from "expo-location";
import { Animated, StyleSheet } from "react-native";

import Header from "../components/Header";
import WeeklyDealsCarousel from "../components/WeeklyDealsCarousel";
import WalletCoins from "../components/WalletCoins";
import QuickMenu from "../components/QuickMenu";
import DailyDishes from "../components/DailyDishes";
import AddressBottomSheet from "../components/AddressBottomSheet";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { AuthContext } from "../context/AuthContext"; // ✅ importa el contexto

export default function HomeScreen() {
const { guestAddress, loginAsGuest } = useContext(AuthContext);
  const [currentAddress, setCurrentAddress] = useState("Cargando dirección...");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMoreDishes, setShowMoreDishes] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeInWallet = useRef(new Animated.Value(0)).current;
  const fadeInMenu = useRef(new Animated.Value(0)).current;
  const fadeInDishes = useRef(new Animated.Value(0)).current;
  const sheetRef = useRef(null);

  useEffect(() => {
    if (guestAddress?.coords) {
      setCurrentAddress(guestAddress.address);
      return;
    }

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCurrentAddress("Permiso denegado");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const [addr] = await Location.reverseGeocodeAsync(loc.coords);
      setCurrentAddress(`${addr.street || ""} ${addr.name || ""}`);
    })();
  }, [guestAddress]);

  useEffect(() => {
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

  const handleOpenSheet = () => {
    sheetRef.current?.present();
  };

  return (
    <>
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
          <Header
            currentAddress={currentAddress}
            openAddressSheet={handleOpenSheet}
          />
          <WeeklyDealsCarousel
            weeklyDeals={weeklyDeals}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </Animated.View>

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

      <AddressBottomSheet
        sheetRef={sheetRef}
        onAddressSelected={(addr, coords) => {
  loginAsGuest(addr, coords); // actualiza contexto global
  setCurrentAddress(addr);    // actualiza localmente
}}

      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
});

// 👇 tus datos de prueba (sin cambios)
const weeklyDeals = [
  {
    id: "1",
    title: "Today's Best Deals",
    image: {
      uri: "https://i.pinimg.com/736x/47/01/a5/4701a5bca5a98a06770921c031f974b8.jpg",
    },
    description: "Off up to 75%",
    gradientColors: ["#FF7A00", "#FF9A00"], // naranja degradado
  },
  {
    id: "2",
    title: "Weekly Best Deals",
    image: {
      uri: "https://t4.ftcdn.net/jpg/13/74/45/89/360_F_1374458987_GeVuTEU2VLC7hzv2yfIt1AFwzHps1zLW.jpg",
    },
    description: "Off up to 50%",
    gradientColors: ["#FF4081", "#ff0000"], // rosa a rojo
  },
  {
    id: "3",
    title: "Top Picks This Week",
    image: {
      uri: "https://myrecipeify.com/wp-content/uploads/2024/10/Chicken-Tempura-Role-8.webp",
    },
    description: "Up to 30% off",
    gradientColors: ["#4facfe", "#00f2fe"], // azul claro degradado
  },
  {
    id: "4",
    title: "Hot Trending Meals",
    image: {
      uri: "https://www.thefoodinmybeard.com/content/taco/whitepeople/wpt10.jpg",
    },
    description: "Exclusive deals",
    gradientColors: ["#43e97b", "#38f9d7"], // verde menta degradado
  },
  {
    id: "5",
    title: "Only for You",
    image: {
      uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg?quality=90&resize=556,505",
    },
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
    route: "FilteredPlatos",
    filterType: "popular",
  },
  {
    label: "Discount",
    icon: <MaterialIcons name="discount" size={28} color="#f43f5e" />,
    route: "FilteredPlatos",
    filterType: "descuento",
  },
  {
    label: "24 Hours",
    icon: <MaterialCommunityIcons name="hours-24" size={28} color="#f43f5e" />,
    route: "FilteredPlatos",
    filterType: "todoElDia",
  },
  {
    label: "Quick Delivery",
    icon: <MaterialIcons name="delivery-dining" size={28} color="#f43f5e" />,
    route: "FilteredPlatos",
    filterType: "entregaRapida",
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


