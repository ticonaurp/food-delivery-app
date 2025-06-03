import React from 'react';
import { SafeAreaView, ScrollView, View, Text, FlatList, StyleSheet, Button } from 'react-native';

const dishes = [
  {
    id: '1',
    name: 'Bottega Ristorante',
    rating: '4.6',
    description: 'Italian restaurant with various dishes',
    deliveryTime: 'Delivery in 15 min',
    distance: '4.6 km',
    extraDiscount: 'Extra discount',
    delivery: 'Free delivery',
  },
  {
    id: '2',
    name: 'SOULFOOD Jakarta',
    rating: '4.7',
    description: 'Indonesian comfort eats served...',
    deliveryTime: 'Delivery in 10 min',
    distance: '3.2 km',
    extraDiscount: 'Extra discount',
  },
  {
    id: '3',
    name: 'Greyhound Cafe',
    rating: '4.2',
    description: 'Hip, industrial-style eatery with...',
    deliveryTime: 'Delivery in 10 min',
    distance: '2.6 km',
    delivery: 'Free delivery',
  },
  {
    id: '4',
    name: 'Le Quartier',
    rating: '4.4',
    description: 'Classic French-influenced brasserie...',
    deliveryTime: 'Delivery in 15 min',
    distance: '5.4 km',
    extraDiscount: 'Extra discount',
  },
];

const App = () => {
  const renderDish = ({ item }) => (
    <View style={styles.dishContainer}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text>{item.rating}</Text>
      <Text>{item.description}</Text>
      <Text>{`Start from $${item.deliveryTime}`}</Text>
      <Text>{`Distance: ${item.distance}`}</Text>
      {item.extraDiscount && <Text>{item.extraDiscount}</Text>}
      {item.delivery && <Text>{item.delivery}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Near Me</Text>
      <Text style={styles.subtitle}>Dishes near me</Text>
      <Text>Catch delicious eats near you</Text>

      <View style={styles.buttonContainer}>
        <Button title="Filter" onPress={() => {}} />
        <Button title="Discount promo" onPress={() => {}} />
        <Button title="Recommended" onPress={() => {}} />
      </View>

      <FlatList
        data={dishes}
        renderItem={renderDish}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  dishContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default App;
