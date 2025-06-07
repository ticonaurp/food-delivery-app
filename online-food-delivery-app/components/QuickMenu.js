import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { quickMenuItems } from "../screens/data/constants";

export default function QuickMenu() {
  return (
    <View style={styles.quickMenu}>
      {quickMenuItems.map(({ label, icon }) => (
        <View key={label} style={styles.quickMenuItem}>
          {icon}
          <Text style={styles.quickMenuText}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  quickMenu: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  quickMenuItem: {
    alignItems: "center",
    marginBottom: 20,
    width: 80,
  },
  quickMenuText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
});
