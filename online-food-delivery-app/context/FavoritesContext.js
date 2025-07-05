"use client"

import { createContext, useState, useContext, useCallback } from "react"

export const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([])
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([])

  // ✅ AGREGAR/QUITAR PLATO DE FAVORITOS
  const toggleFavoriteItem = useCallback((item, restaurant) => {
    setFavoriteItems((prevFavorites) => {
      const existingIndex = prevFavorites.findIndex((fav) => fav.id === item.id)

      if (existingIndex >= 0) {
        // Quitar de favoritos
        console.log("💔 Removiendo de favoritos:", item.name)
        return prevFavorites.filter((fav) => fav.id !== item.id)
      } else {
        // Agregar a favoritos
        console.log("❤️ Agregando a favoritos:", item.name)
        const favoriteItem = {
          ...item,
          restaurant: restaurant,
          addedAt: new Date().toISOString(),
        }
        return [...prevFavorites, favoriteItem]
      }
    })
  }, [])

  // ✅ AGREGAR/QUITAR RESTAURANTE DE FAVORITOS
  const toggleFavoriteRestaurant = useCallback((restaurant) => {
    setFavoriteRestaurants((prevFavorites) => {
      const existingIndex = prevFavorites.findIndex((fav) => fav.id === restaurant.id)

      if (existingIndex >= 0) {
        console.log("💔 Removiendo restaurante de favoritos:", restaurant.name)
        return prevFavorites.filter((fav) => fav.id !== restaurant.id)
      } else {
        console.log("❤️ Agregando restaurante a favoritos:", restaurant.name)
        const favoriteRestaurant = {
          ...restaurant,
          addedAt: new Date().toISOString(),
        }
        return [...prevFavorites, favoriteRestaurant]
      }
    })
  }, [])

  // ✅ VERIFICAR SI UN PLATO ES FAVORITO
  const isItemFavorite = useCallback(
    (itemId) => {
      return favoriteItems.some((fav) => fav.id === itemId)
    },
    [favoriteItems],
  )

  // ✅ VERIFICAR SI UN RESTAURANTE ES FAVORITO
  const isRestaurantFavorite = useCallback(
    (restaurantId) => {
      return favoriteRestaurants.some((fav) => fav.id === restaurantId)
    },
    [favoriteRestaurants],
  )

  // ✅ OBTENER TOTAL DE FAVORITOS
  const getTotalFavorites = useCallback(() => {
    return favoriteItems.length + favoriteRestaurants.length
  }, [favoriteItems.length, favoriteRestaurants.length])

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        favoriteRestaurants,
        toggleFavoriteItem,
        toggleFavoriteRestaurant,
        isItemFavorite,
        isRestaurantFavorite,
        getTotalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
