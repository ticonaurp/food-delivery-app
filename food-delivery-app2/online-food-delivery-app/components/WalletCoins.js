// WalletCoins.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const WalletCoins = () => {
  return (
    <View style={styles.walletCoinsContainer}>
      <View style={styles.walletCoinsBox}>
        <FontAwesome5 name="wallet" size={20} color="#ec4899" />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.walletCoinsTitle}>Your Wallet</Text>
          <Text style={styles.walletCoinsValue}>Rp699.000</Text>
        </View>
      </View>
      <View style={styles.walletCoinsBox}>
        <FontAwesome5 name="coins" size={20} color="#ec4899" />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.walletCoinsTitle}>Your Coins</Text>
          <Text style={styles.walletCoinsValue}>1.200</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  walletCoinsContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 20,
  },
  walletCoinsBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRightWidth: 1,
    borderColor: "#e5e7eb",
  },
  walletCoinsTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },
  walletCoinsValue: {
    fontSize: 14,
    color: "#6b7280",
  },
});

export default WalletCoins;
