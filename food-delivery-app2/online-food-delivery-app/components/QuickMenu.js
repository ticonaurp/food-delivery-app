// QuickMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuickMenu = ({ quickMenuItems }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.quickMenu}>
      {quickMenuItems.map(({ label, icon, route }) => (
        <TouchableOpacity
          key={label}
          style={styles.quickMenuItem}
          onPress={() => navigation.navigate(route)}
        >
          {icon}
          <Text style={styles.quickMenuText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginHorizontal: 16,
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
  },
});

export default QuickMenu;
