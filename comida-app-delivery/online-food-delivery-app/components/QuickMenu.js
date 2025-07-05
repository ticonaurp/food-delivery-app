"use client"

import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

const QuickMenu = ({ quickMenuItems = [] }) => {
  const navigation = useNavigation()

  if (!Array.isArray(quickMenuItems) || quickMenuItems.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.quickMenu}>
        {quickMenuItems.map((item, index) => {
          if (!item || !item.label) {
            return null
          }

          return (
            <TouchableOpacity
              key={`menu-item-${index}`}
              style={styles.quickMenuItem}
              onPress={() => {
                if (item.route) {
                  navigation.navigate(item.route, item.filterType ? { filterType: item.filterType } : undefined)
                }
              }}
            >
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text style={styles.quickMenuText}>{item.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  quickMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    lineHeight: 16,
  },
})

export default QuickMenu
