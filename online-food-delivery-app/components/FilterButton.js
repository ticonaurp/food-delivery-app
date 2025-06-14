import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterButton = ({ label, type, icon, currentFilter, setFilter }) => (
  <TouchableOpacity
    style={[styles.button, currentFilter === type && styles.active]}
    onPress={() => setFilter(type)}
  >
    <Text style={[styles.text, currentFilter === type && styles.activeText]}>
      {icon} {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  active: {
    backgroundColor: '#E11D48',
  },
  text: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
});

export default FilterButton;
