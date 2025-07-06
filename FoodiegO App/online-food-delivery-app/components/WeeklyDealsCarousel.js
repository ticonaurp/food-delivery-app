"use client";

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";

const { width } = Dimensions.get("window");

const WeeklyDealsCarousel = ({
  weeklyDeals = [],
  currentIndex = 0,
  setCurrentIndex = () => {},
}) => {
  if (!Array.isArray(weeklyDeals) || weeklyDeals.length === 0) {
    return null;
  }

  const decreasingDots = weeklyDeals.map((_, i) => ({
    quantity: 1,
    config: {
      opacity: 1 - i * 0.2,
      color: "#FF5864",
      margin: 4,
      size: 8,
    },
  }));

  return (
    <View style={styles.wrapper}>
      <Carousel
        loop
        autoPlay
        data={weeklyDeals}
        width={width - 32}
        height={140}
        scrollAnimationDuration={1200}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 40,
        }}
        onSnapToItem={setCurrentIndex}
        renderItem={({ item }) => (
          <LinearGradient
            colors={item.gradientColors || ["#FF7A00", "#FF9A00"]}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.dealContent}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              {item.image && (
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
            </View>
          </LinearGradient>
        )}
      />

      <AnimatedDotsCarousel
        length={weeklyDeals.length}
        currentIndex={currentIndex}
        maxIndicators={5}
        interpolateOpacityAndColor
        decreasingDots={decreasingDots}
        activeIndicatorConfig={{
          color: "#FF5864",
          margin: 4,
          opacity: 1,
          size: 12,
        }}
        inactiveIndicatorConfig={{
          color: "#FF5864",
          margin: 4,
          opacity: 0.3,
          size: 8,
        }}
        style={{ marginTop: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingLeft: 16,
    marginTop: 12,
  },
  card: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 16,
    height: 140,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
  },
  dealContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
});

export default WeeklyDealsCarousel;
