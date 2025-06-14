// src/components/DailyDishes.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DailyDishes = ({
  dailyDishes,
  additionalDishes,
  showMoreDishes,
  setShowMoreDishes,
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(animation, {
      toValue: showMoreDishes ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showMoreDishes]);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, additionalDishes.length * 100], // ajusta según la altura de cada card
  });

  return (
    <View>
      <View style={styles.dailyHeader}>
        <Text style={styles.dailyTitle}>Daily Dishes</Text>
        <TouchableOpacity onPress={() => setShowMoreDishes(!showMoreDishes)}>
          <Text style={styles.seeAllText}>
            {showMoreDishes ? 'See less' : 'See all'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dailyGrid}>
        {dailyDishes.map((item, i) => (
          <View
            key={`base-${i}`}
            style={[styles.dishCard, { backgroundColor: item.color }]}
          >
            <Text style={styles.dishTitle}>{item.title}</Text>
            <Text style={styles.dishSubtitle}>{item.count} Restaurant Already</Text>
          </View>
        ))}
      </View>

      <Animated.View style={[styles.dailyGrid, { height: animatedHeight, overflow: 'hidden' }]}>
        {additionalDishes.map((item, i) => (
          <View
            key={`extra-${i}`}
            style={[styles.dishCard, { backgroundColor: item.color }]}
          >
            <Text style={styles.dishTitle}>{item.title}</Text>
            <Text style={styles.dishSubtitle}>{item.count} Restaurant Already</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  dailyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  dailyTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f43f5e',
  },
  dailyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  dishCard: {
    width: '48%',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'center',
  },
  dishTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  dishSubtitle: {
    fontSize: 12,
    color: '#f3f4f6',
  },
});

export default DailyDishes;
