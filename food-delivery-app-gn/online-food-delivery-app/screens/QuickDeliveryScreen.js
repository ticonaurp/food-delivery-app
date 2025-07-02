// screens/QuickDeliveryScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const QuickDeliveryScreen = () => {
  return (
    <LinearGradient colors={['#FFA726', '#FF7043']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Ionicons name="rocket-outline" size={26} color="#fff" />
          <Text style={styles.title}>Quick Delivery</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Under 20 minutes</Text>
          <Text style={styles.cardDescription}>Selected items eligible for ultra-fast delivery.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Track your courier</Text>
          <Text style={styles.cardDescription}>Real-time tracking with live location updates.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF5722',
  },
  cardDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default QuickDeliveryScreen;
