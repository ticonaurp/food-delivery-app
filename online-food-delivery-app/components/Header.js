"use client"

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useContext } from "react"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { FavoritesContext } from "../context/FavoritesContext"
import { CommonActions } from "@react-navigation/native"

const Header = ({ currentAddress, openAddressSheet }) => {
  const navigation = useNavigation()
  const { getTotalFavorites } = useContext(FavoritesContext)

  const totalFavorites = getTotalFavorites()

  return (
    <View style={styles.wrapper}>
      <Image
        source={{
          uri: "https://storage.googleapis.com/a1aa/image/adc687b5-006d-4ba1-6105-1c8ba29ccb4b.jpg",
        }}
        style={styles.headerBgImage}
        resizeMode="cover"
        blurRadius={2}
      />
      <LinearGradient colors={["#ff5f6d", "#ffc371"]} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.addressLabel}>Your current address</Text>
          <TouchableOpacity style={styles.addressContainer} onPress={openAddressSheet}>
            <Text style={styles.addressText}>
              {typeof currentAddress === "string" ? currentAddress : "Dirección no disponible"}
            </Text>
            <Ionicons name="chevron-down" size={16} color="white" style={{ marginLeft: 4, marginTop: 2 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIcons}>
          {/* ✅ CORAZÓN QUE NAVEGA A FAVORITOS */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => navigation.navigate("FavoritesScreen")}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="heart"
              size={22}
              color={totalFavorites > 0 ? "#FFD93D" : "white"}
              solid={totalFavorites > 0}
            />
            {totalFavorites > 0 && (
              <View style={styles.favoriteBadge}>
                <Text style={styles.favoriteBadgeText}>{totalFavorites > 99 ? "99+" : totalFavorites}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* ✅ NOTIFICACIONES QUE NAVEGA A NOTIFICATIONSSCREEN */}
          <TouchableOpacity
            style={{ marginLeft: 16, padding: 4 }}
            onPress={() =>
  navigation.dispatch(
    CommonActions.navigate({
      name: "NotificationsScreen",
    })
  )
}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.searchBox}
          activeOpacity={0.8}
          onPress={() =>
  navigation.dispatch(
    CommonActions.navigate({
      name: "SearchScreen",
    })
  )
}

        >
          <Ionicons name="search-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
          <Text style={styles.input}>¿Qué te gustaría comer?</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
  },
  headerBgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 180,
    opacity: 0.2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 1,
  },
  addressLabel: {
    color: "rgba(255,255,255,0.8)",
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
    zIndex: 3,
  },
  favoriteButton: {
    position: "relative",
    padding: 4,
  },
  favoriteBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF6B35",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  favoriteBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    height: 48,
    marginTop: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  input: {
    fontSize: 15,
    color: "#6B7280",
    flex: 1,
  },
})

export default Header
