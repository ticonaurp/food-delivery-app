// src/screens/CategoryScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CategoryScreen({ route }) {
  const { category } = route.params; // Get the category passed from the HomeScreen

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      {/* You can add code here to display the relevant food items based on the category */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
