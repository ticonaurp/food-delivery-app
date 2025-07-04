"use client"

import { useState, useEffect, useRef, useContext } from "react"
import * as Location from "expo-location"
import { Animated, StyleSheet } from "react-native"
import Header from "../components/Header"
import WeeklyDealsCarousel from "../components/WeeklyDealsCarousel"
import WalletCoins from "../components/WalletCoins"
import QuickMenu from "../components/QuickMenu"
import DailyDishes from "../components/DailyDishes"
import AddressBottomSheet from "../components/AddressBottomSheet"
import { Ionicons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export default function HomeScreen() {
  const { guestAddress, loginAsGuest } = useContext(AuthContext)
  const [currentAddress, setCurrentAddress] = useState("Cargando dirección...")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMoreDishes, setShowMoreDishes] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current
  const fadeInWallet = useRef(new Animated.Value(0)).current
  const fadeInMenu = useRef(new Animated.Value(0)).current
  const fadeInDishes = useRef(new Animated.Value(0)).current
  const sheetRef = useRef(null)

  useEffect(() => {
    if (guestAddress?.coords) {
      setCurrentAddress(guestAddress.address)
      return
    }
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setCurrentAddress("Permiso denegado")
        return
      }
      const loc = await Location.getCurrentPositionAsync({})
      const [addr] = await Location.reverseGeocodeAsync(loc.coords)
      setCurrentAddress(`${addr.street || ""} ${addr.name || ""}`)
    })()
  }, [guestAddress])

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
    ]).start()
  }, [])

  const handleOpenSheet = () => {
    sheetRef.current?.present()
  }

  return (
    <>
      <Animated.ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
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
          <Header currentAddress={currentAddress} openAddressSheet={handleOpenSheet} />
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
          loginAsGuest(addr, coords) // actualiza contexto global
          setCurrentAddress(addr) // actualiza localmente
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
})

// 👇 tus datos de prueba traducidos
const weeklyDeals = [
  {
    id: "1",
    title: "Ofertas del Día",
    image: {
      uri: "https://i.pinimg.com/736x/47/01/a5/4701a5bca5a98a06770921c031f974b8.jpg",
    },
    description: "Hasta 75% de descuento",
    gradientColors: ["#FF7A00", "#FF9A00"],
  },
  {
    id: "2",
    title: "Ofertas Semanales",
    image: {
      uri: "https://t4.ftcdn.net/jpg/13/74/45/89/360_F_1374458987_GeVuTEU2VLC7hzv2yfIt1AFwzHps1zLW.jpg",
    },
    description: "Hasta 50% de descuento",
    gradientColors: ["#FF4081", "#ff0000"],
  },
  {
    id: "3",
    title: "Favoritos de la Semana",
    image: {
      uri: "https://myrecipeify.com/wp-content/uploads/2024/10/Chicken-Tempura-Role-8.webp",
    },
    description: "Hasta 30% de descuento",
    gradientColors: ["#4facfe", "#00f2fe"],
  },
  {
    id: "4",
    title: "Tendencias Calientes",
    image: {
      uri: "https://www.thefoodinmybeard.com/content/taco/whitepeople/wpt10.jpg",
    },
    description: "Ofertas exclusivas",
    gradientColors: ["#43e97b", "#38f9d7"],
  },
  {
    id: "5",
    title: "Solo para Ti",
    image: {
      uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg?quality=90&resize=556,505",
    },
    description: "Descuento sorpresa",
    gradientColors: ["#ff9a9e", "#fad0c4"],
  },
]

const quickMenuItems = [
  {
    label: "Cerca de Mí",
    icon: <FontAwesome6 name="map-location-dot" size={28} color="#f43f5e" />,
    route: "NearMeScreen",
  },
  {
    label: "Populares",
    icon: <FontAwesome5 name="award" size={28} color="#f43f5e" />,
    route: "FilteredPlatos",
    filterType: "popular",
  },
  {
    label: "Descuento",
    icon: <MaterialIcons name="discount" size={28} color="#f43f5e" />,
    route: "FilteredPlatos",
    filterType: "descuento",
  },
  {
    label: "24 Horas",
    icon: <MaterialCommunityIcons name="hours-24" size={28} color="#f43f5e" />,
    route: "FilteredPlatos",
    filterType: "todoElDia",
  },
  {
    label: "Entrega Rápida",
    icon: <MaterialIcons name="delivery-dining" size={28} color="#f43f5e" />,
    route: "FilteredPlatos",
    filterType: "entregaRapida",
  },
];

const dailyDishes = [
  {
    title: "Favoritos del Cliente",
    count: "321",
    color: "#f59e0b",
  },
  {
    title: "Bebidas",
    count: "189",
    color: "#f94a7a",
  },
  {
    title: "Comida Rápida",
    count: "526",
    color: "#3b5afe",
  },
  {
    title: "Postres",
    count: "891",
    color: "#3db2f5",
  },
]

const additionalDishes = [
  {
    title: "Pizza",
    count: "150",
    color: "#3b5afe",
  },
  {
    title: "Ensaladas",
    count: "230",
    color: "#f59e0b",
  },
]

