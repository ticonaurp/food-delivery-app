import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FilterButton from './FilterButton';

const filters = [
  { label: 'Filter', type: 'all', icon: '🔄' },
  { label: 'Discount promo', type: 'discount', icon: '💸' },
  { label: 'Recommended', type: 'recommended', icon: '🌟' },
  { label: 'Free Delivery', type: 'freeDelivery', icon: '🚚' },
  { label: 'Price ↑', type: 'priceLowToHigh', icon: '💰' },
  { label: 'Nearest', type: 'nearest', icon: '📍' },
];

const FilterBar = ({ currentFilter, setFilter }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
    {filters.map(f => (
      <FilterButton
        key={f.type}
        label={f.label}
        type={f.type}
        icon={f.icon}
        currentFilter={currentFilter}
        setFilter={setFilter}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});

export default FilterBar;
