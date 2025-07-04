"use client"

import { Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"

const FilterBar = ({ currentFilter = "all", setFilter }) => {
  const filters = [
    { key: "all", label: "Filter" },
    { key: "recommended", label: "Recommended" },
    { key: "discount", label: "Discount promo" },
    { key: "freeDelivery", label: "Free delivery" },
    { key: "nearest", label: "Nearest" },
    { key: "priceLowToHigh", label: "Price: Low to High" },
  ]

  const handleFilterPress = (filterKey) => {
    if (setFilter && typeof setFilter === "function") {
      setFilter(filterKey)
    }
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {filters.map((filter, index) => {
        // Verificar que el filter existe y tiene las propiedades necesarias
        if (!filter || !filter.key || !filter.label) {
          return null
        }

        const isActive = currentFilter === filter.key

        return (
          <TouchableOpacity
            key={`filter-${filter.key}-${index}`}
            style={[styles.filterButton, isActive && styles.activeFilterButton]}
            onPress={() => handleFilterPress(filter.key)}
          >
            <Text style={[styles.filterText, isActive && styles.activeFilterText]}>{filter.label}</Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 0,
  },
  filterButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeFilterButton: {
    backgroundColor: "#FF4500",
    borderColor: "#FF4500",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  activeFilterText: {
    color: "white",
  },
})

export default FilterBar
