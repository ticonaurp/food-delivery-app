"use client"
import { useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { CartContext } from "../context/CartContext"
import { FavoritesContext } from "../context/FavoritesContext"
import { getAllDishesWithRestaurant } from "../data/restaurants"
import StatusBarConfig from "../components/StatusBarConfig"
import { formatearSoles } from "../utils/currencyUtils"

export default function SearchScreen() {
  const navigation = useNavigation()
  const { addToCart } = useContext(CartContext)
  const { toggleFavoriteItem, isItemFavorite } = useContext(FavoritesContext)

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [recentSearches, setRecentSearches] = useState(["Pizza", "Burger", "Sushi", "Pasta"])
  const [popularSearches] = useState(["Pizza Margherita", "Classic Burger", "Salmon Roll", "Fried Rice"])
  const [loading, setLoading] = useState(false)
  const [allDishes, setAllDishes] = useState([])

  useEffect(() => {
    // Cargar todos los platos al iniciar
    const dishes = getAllDishesWithRestaurant()
    // Asegurar que cada plato tenga un ID único
    const dishesWithIds = dishes.map((dish, index) => ({
      ...dish,
      id: dish.id || dish.uniqueId || `dish_${index}`,
      uniqueId: dish.uniqueId || dish.id || `dish_${index}`,
    }))
    setAllDishes(dishesWithIds)
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      performSearch(searchQuery)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const performSearch = (query) => {
    setLoading(true)
    // Simular delay de búsqueda
    setTimeout(() => {
      const filtered = allDishes.filter((dish) => {
        // Validar que dish existe y tiene las propiedades necesarias
        if (!dish) return false

        const dishName = dish.name || ""
        const dishDescription = dish.description || ""
        const restaurantName = dish.restaurant?.name || ""
        const dishCategory = dish.category || ""

        return (
          dishName.toLowerCase().includes(query.toLowerCase()) ||
          dishDescription.toLowerCase().includes(query.toLowerCase()) ||
          restaurantName.toLowerCase().includes(query.toLowerCase()) ||
          dishCategory.toLowerCase().includes(query.toLowerCase())
        )
      })
      setSearchResults(filtered)
      setLoading(false)
    }, 300)
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      setRecentSearches((prev) => [searchQuery.trim(), ...prev.slice(0, 4)])
    }
  }

  const handleAddToCart = (dish) => {
    if (dish && dish.restaurant) {
      addToCart(dish, dish.restaurant)
    }
  }

  const handleToggleFavorite = (dish) => {
    if (dish && dish.restaurant) {
      toggleFavoriteItem(dish, dish.restaurant)
    }
  }

  // Función helper para obtener el ID del plato de manera segura
  const getDishId = (dish) => {
    return dish?.id || dish?.uniqueId || "unknown"
  }

  const renderSearchResult = ({ item: dish }) => {
    // Validar que dish existe
    if (!dish) return null

    const dishId = getDishId(dish)
    const isFavorite = isItemFavorite(dishId)

    return (
      <View style={styles.resultItem}>
        <Image source={{ uri: dish.image || "https://via.placeholder.com/80" }} style={styles.resultImage} />
        <View style={styles.resultInfo}>
          <Text style={styles.resultName}>{dish.name || "Plato sin nombre"}</Text>
          <Text style={styles.resultRestaurant}>{dish.restaurant?.name || "Restaurante desconocido"}</Text>
          <Text style={styles.resultDescription} numberOfLines={2}>
            {dish.description || "Sin descripción disponible"}
          </Text>
          <View style={styles.resultFooter}>
            <View style={styles.priceContainer}>
              {dish.hasDiscount ? (
                <>
                  <Text style={styles.originalPrice}>{formatearSoles(dish.originalPrice || 0)}</Text>
                  <Text style={styles.discountPrice}>{formatearSoles(dish.discountPrice || 0)}</Text>
                </>
              ) : (
                <Text style={styles.price}>{formatearSoles(dish.price || dish.originalPrice || 0)}</Text>
              )}
            </View>
            <View style={styles.resultActions}>
              <TouchableOpacity
                style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
                onPress={() => handleToggleFavorite(dish)}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color={isFavorite ? "#FFFFFF" : "#E94864"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(dish)}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderSuggestion = (text, onPress) => (
    <TouchableOpacity key={text} style={styles.suggestionItem} onPress={() => onPress(text)}>
      <Ionicons name="search" size={16} color="#8E8E93" />
      <Text style={styles.suggestionText}>{text}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarConfig barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="¿Qué te gustaría comer?"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            autoFocus={true}
            placeholderTextColor="#8E8E93"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E94864" />
            <Text style={styles.loadingText}>Buscando...</Text>
          </View>
        ) : searchQuery.trim().length === 0 ? (
          // Sugerencias cuando no hay búsqueda
          <View>
            <Text style={styles.sectionTitle}>Búsquedas recientes</Text>
            <View style={styles.suggestionsContainer}>
              {recentSearches.map((search) => renderSuggestion(search, (text) => setSearchQuery(text)))}
            </View>
            <Text style={styles.sectionTitle}>Búsquedas populares</Text>
            <View style={styles.suggestionsContainer}>
              {popularSearches.map((search) => renderSuggestion(search, (text) => setSearchQuery(text)))}
            </View>
          </View>
        ) : searchResults.length > 0 ? (
          // Resultados de búsqueda
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item, index) => getDishId(item) || `item_${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
          />
        ) : (
          // Sin resultados
          <View style={styles.noResultsContainer}>
            <Ionicons name="search" size={60} color="#8E8E93" />
            <Text style={styles.noResultsTitle}>No encontramos resultados</Text>
            <Text style={styles.noResultsSubtitle}>Intenta buscar con otras palabras o revisa la ortografía</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E7",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1D1D1F",
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#8E8E93",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 12,
    marginTop: 8,
  },
  suggestionsContainer: {
    marginBottom: 24,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 16,
    color: "#1D1D1F",
    marginLeft: 12,
  },
  resultsList: {
    paddingBottom: 100,
  },
  resultItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F2F2F7",
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  resultRestaurant: {
    fontSize: 14,
    color: "#E94864",
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 18,
    marginBottom: 8,
  },
  resultFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  originalPrice: {
    fontSize: 14,
    color: "#8E8E93",
    textDecorationLine: "line-through",
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E94864",
  },
  resultActions: {
    flexDirection: "row",
    gap: 8,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFE8EC",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButtonActive: {
    backgroundColor: "#E94864",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E94864",
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1D1D1F",
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 24,
  },
})
