import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TABS = ['Popular', 'Main Courses', 'Appetizer', 'Pizza & Pasta'];

const DetailRestoran = () => {
  const { params } = useRoute();
  const restaurant = params?.restaurant;
  const [activeTab, setActiveTab] = useState(TABS[0]);

  if (!restaurant) {
    return (
      <View style={styles.centered}>
        <Text>No se encontró el restaurante.</Text>
      </View>
    );
  }

  const menuSection = restaurant.menu?.[activeTab];

  return (
    <ScrollView style={styles.container}>
      <Image source={restaurant.imageUrl} style={styles.headerImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtext}>Italian Resto Fairgrounds, SCBD, Jakarta</Text>
        <Text style={styles.linkText}>See on maps</Text>

        <View style={styles.row}>
          <Text style={styles.boldText}>4.8</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.boldText}>6</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.boldText}>48-890rb</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.boldText}>8AM-8PM</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.lightText}>99+ reviews</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.lightText}>Menu variants</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.lightText}>Price range</Text>
          <Text style={styles.separator}> | </Text>
          <Text style={styles.lightText}>Opening hours</Text>
        </View>

        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.boldText}>{restaurant.distance}km distance</Text>
          <Text style={[styles.linkText, { marginLeft: 'auto' }]}>Change location</Text>
        </View>
        <Text style={styles.deliveryText}>
          Est. delivery fee 12rb · delivery in {restaurant.deliveryTime}
        </Text>

        <View style={styles.discountBox}>
          <Text style={styles.discountTitle}>Discount for you</Text>
          <View style={styles.discountItem}>
            <Text style={styles.discountText}>🎁 F&B discount 75%</Text>
          </View>
          <View style={styles.discountItem}>
            <Text style={styles.discountText}>🚚 Shipping Discount 50%</Text>
          </View>
          <Text style={styles.discountNote}>Discount for all menus. Applicable for all merchants.</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {TABS.map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>{activeTab}</Text>
        {menuSection?.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Image source={item.image} style={styles.menuImage} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              {item.originalPrice && (
                <Text style={styles.originalPrice}>${item.originalPrice}</Text>
              )}
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerImage: { width: '100%', height: 220 },
  infoContainer: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subtext: { fontSize: 15, color: '#555' },
  linkText: { fontSize: 14, color: '#007bff', marginTop: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, alignItems: 'center' },
  boldText: { fontWeight: 'bold', fontSize: 14 },
  lightText: { fontSize: 13, color: '#666' },
  separator: { marginHorizontal: 6, color: '#aaa' },
  deliveryText: { fontSize: 14, marginTop: 6, color: '#444' },
  discountBox: {
    marginTop: 16,
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  discountTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  discountItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  discountText: { fontSize: 14 },
  discountNote: { fontSize: 12, color: '#666', marginTop: 8 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, marginVertical: 12 },
  tab: {
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#eee',
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  menuSection: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  menuImage: { width: 60, height: 60, borderRadius: 8 },
  itemName: { fontSize: 16 },
  itemPrice: { fontSize: 14, color: 'gray' },
  originalPrice: { fontSize: 12, color: 'red', textDecorationLine: 'line-through' },
  itemDescription: { fontSize: 12, color: '#555' },
});

export default DetailRestoran;