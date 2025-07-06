"use client"

import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const DailyDishes = ({
  dailyDishes = [],
  additionalDishes = [],
  showMoreDishes = false,
  setShowMoreDishes = () => {},
}) => {
  if (!Array.isArray(dailyDishes) || dailyDishes.length === 0) {
    return null
  }

  const allDishes = showMoreDishes ? [...dailyDishes, ...additionalDishes] : dailyDishes

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Platos del Día</Text>
        {additionalDishes.length > 0 && (
          <TouchableOpacity onPress={() => setShowMoreDishes(!showMoreDishes)}>
            <Text style={styles.seeAllText}>{showMoreDishes ? "Ver menos" : "Ver más"}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.dishesGrid}>
        {allDishes.map((dish, index) => {
          if (!dish || !dish.title) {
            return null
          }

          return (
            <TouchableOpacity key={`dish-${index}`} style={[styles.dishCard, { backgroundColor: dish.color }]}>
              <View style={styles.dishContent}>
                <Text style={styles.dishTitle}>{dish.title}</Text>
                <Text style={styles.dishSubtitle}>{dish.count} restaurantes disponibles</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#E94864",
    fontWeight: "600",
  },
  dishesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dishCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    minHeight: 100,
    justifyContent: "center",
  },
  dishContent: {
    flex: 1,
    justifyContent: "center",
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  dishSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
})

export default DailyDishes
