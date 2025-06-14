// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Header = ({ currentAddress }) => {
  return (
    <LinearGradient
      colors={["#ff5f6d", "#ffc371"]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.addressLabel}>Your current address</Text>
        <TouchableOpacity style={styles.addressContainer}>
          <Text style={styles.addressText}>{currentAddress}</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color="white"
            style={{ marginLeft: 4, marginTop: 2 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <FontAwesome5 name="heart" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Ionicons name="notifications-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="What would you like to eat?"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
      </View>
      <Image
        source={{
          uri:
            "https://storage.googleapis.com/a1aa/image/adc687b5-006d-4ba1-6105-1c8ba29ccb4b.jpg",
        }}
        style={styles.headerBgImage}
        resizeMode="cover"
        blurRadius={1}
        fadeDuration={0}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
  },
  addressLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  headerIcons: {
    position: "absolute",
    right: 16,
    top: 50,
    flexDirection: "row",
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    height: 40,
    marginTop: 16,
  },
  input: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
    color: "#000",
  },
  headerBgImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 80,
    opacity: 0.15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default Header;
