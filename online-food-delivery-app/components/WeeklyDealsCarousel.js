// WeeklyDealsCarousel.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';

const WeeklyDealsCarousel = ({ weeklyDeals, currentIndex, setCurrentIndex }) => {
  const decreasingDots = Array(5)
    .fill(0)
    .map((_, i) => ({
      quantity: 1,
      config: { opacity: 1 - i * 0.2, color: "#FF5864", margin: 4, size: 8 },
    }));

  return (
    <View style={{ width: "100%", paddingLeft: 16, marginTop: 12 }}>
      <Carousel
        loop
        width={320}
        height={140}
        autoPlay={true}
        data={weeklyDeals}
        onSnapToItem={setCurrentIndex}
        scrollAnimationDuration={1200}
        mode="parallax"
        modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 40 }}
        renderItem={({ item }) => (
          <LinearGradient
            colors={item.gradientColors} // Usa directamente desde item
            style={styles.mainDealCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.dealTextContainer}>
              <Text style={styles.mainDealTitle}>{item.title}</Text>
              <Text style={styles.mainDealSubtitle}>{item.description}</Text>
            </View>
            {item.image && (
              <Image
                source={item.image}
                style={styles.promoImage}
                resizeMode="cover"
              />
            )}
          </LinearGradient>
        )}

      />
      <AnimatedDotsCarousel
        length={weeklyDeals.length}
        currentIndex={currentIndex}
        maxIndicators={5}
        interpolateOpacityAndColor={true}
        decreasingDots={decreasingDots}
        activeIndicatorConfig={{ color: "#FF5864", margin: 4, opacity: 1, size: 12 }}
        inactiveIndicatorConfig={{ color: "#FF5864", margin: 4, opacity: 0.3, size: 8 }}
        style={{ marginTop: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainDealCard: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 15,
    marginRight: 20,
    alignItems: "center",
    width: 320,
    height: 140,
    justifyContent: "space-between",
  },
  dealTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  mainDealTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  mainDealSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  },
  promoImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
});

export default WeeklyDealsCarousel;
