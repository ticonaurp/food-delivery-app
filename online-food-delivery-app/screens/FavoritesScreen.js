"use client"

import { useContext, useMemo } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { AuthContext } from "../context/AuthContext"
import { restaurants } from "../data/restaurants"
import RestaurantCard from "../components/RestaurantCard"

const FavoritesScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext)
  const favoriteRestaurants = authContext?.favoriteRestaurants || []

  const favoriteRestaurantsList = useMemo(() => {
    return restaurants.filter((restaurant) => favoriteRestaurants.includes(restaurant.id))
  }, [favoriteRestaurants])

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate("RestaurantDetail", { restaurant })
  }

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>Start adding restaurants to your favorites by tapping the heart icon!</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteRestaurantsList}
        renderItem={({ item, index }) => <RestaurantCard item={item} onPress={handleRestaurantPress} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 40,
  },
})

export default FavoritesScreen
