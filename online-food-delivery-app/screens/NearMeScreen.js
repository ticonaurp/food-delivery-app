import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { restaurants } from '../data/restaurants';
import FilterBar from '../components/FilterBar';
import RestaurantCard from '../components/RestaurantCard';

import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const NearMeScreen = () => {
  const [filterType, setFilterType] = useState('all');

  const filteredData = useMemo(() => {
    switch (filterType) {
      case 'discount':
        return restaurants.filter(item => item.promo);
      case 'recommended':
        return restaurants.filter(item => item.rating >= 4.5);
      case 'freeDelivery':
        return restaurants.filter(item => item.freeDelivery);
      case 'priceLowToHigh':
        return [...restaurants].sort((a, b) => a.price - b.price);
      case 'nearest':
        return [...restaurants].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      default:
        return restaurants;
    }
  }, [filterType]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp.delay(index * 100)}>
              <RestaurantCard item={item} />
            </Animated.View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          ListHeaderComponent={
            <>
              <Animated.Text entering={FadeInDown.duration(400)} style={styles.header}>
                Near Me
              </Animated.Text>
              <Animated.Text entering={FadeInDown.delay(150).duration(400)} style={styles.subHeader}>
                Catch delicious eats near you
              </Animated.Text>
              <Animated.View entering={FadeInDown.delay(300).duration(400)}>
                <FilterBar currentFilter={filterType} setFilter={setFilterType} />
              </Animated.View>
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  listContentContainer: {
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default NearMeScreen;
