import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';



const data = [
    {
        id: '1',
        name: 'Bottega Ristorante',
        rating: 4.6,
        reviews: 456,
        distance: '4.6 km',
        deliveryTime: 'in 15 min',
        description: 'Italian restaurant with various dishes',
        promo: 'Extra discount',
        freeDelivery: true,
        imageUrl: require('../assets/Italian-Restaurants.jpg')
    },
    {
        id: '2',
        name: 'SOULFOOD Jakarta',
        rating: 4.7,
        reviews: 321,
        distance: '3.2 km',
        deliveryTime: 'in 10 min',
        description: 'Indonesian comfort eats served...',
        promo: 'Extra discount',
        freeDelivery: false,
        imageUrl: require('../assets/soulfood.jpg')
    },
    {
        id: '3',
        name: 'Greyhound Cafe',
        rating: 4.2,
        reviews: 210,
        distance: '2.9 km',
        deliveryTime: 'in 10 min',
        description: 'Hip, industrial-style eatery with...',
        promo: 'Extra discount',
        freeDelivery: true,
        imageUrl: require('../assets/cafe.jpg')
    },
    {
        id: '4',
        name: 'Le Quartier',
        rating: 4.4,
        reviews: 150,
        distance: '5.4 km',
        deliveryTime: 'in 15 min',
        description: 'Classic French-influenced brasserie...',
        promo: 'Extra discount',
        freeDelivery: false,
        imageUrl: require('../assets/Le Quartier.jpg')
    }
];

const NearMeScreen = () => {
  const navigation = useNavigation(); // <- Cambiado

  const navigateToHome = () => {
    navigation.navigate('HomeMain');

  };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Image source={item.imageUrl} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>⭐ {item.rating}</Text>
                            <Text style={styles.reviewCount}>({item.reviews})</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="heart-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    <Text>{item.description}</Text>
                    <Text>Start from 49rb • {item.distance} • Delivery {item.deliveryTime}</Text>
                    {item.freeDelivery && <Text style={styles.freeDelivery}>Free delivery</Text>}
                    {item.promo && <Text style={styles.promo}>{item.promo}</Text>}
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Near Me</Text>
            <Text style={styles.subHeader}>Dishes near me</Text>
            <Text style={styles.recommendation}>Catch delicious eats near you</Text>

            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Filter</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Discount promo</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Recommended</Text></TouchableOpacity>
                <TouchableOpacity onPress={navigateToHome}><Text>Go to Home</Text></TouchableOpacity>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 8,
    },
    recommendation: {
        fontSize: 16,
        marginBottom: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    filterButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
    },
    filterText: {
        fontSize: 16,
        color: '#000',
    },
    card: {
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    cardContent: {
        flexDirection: 'row',
    },
    image: {
        width: 100, // Tamaño fijo para la imagen
        height: 100,
        borderRadius: 8,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 16,
    },
    reviewCount: {
        fontSize: 16,
        marginLeft: 4,
        color: 'grey',
    },
    promo: {
        color: 'red',
        fontWeight: 'bold',
    },
    freeDelivery: {
        color: 'green',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        color: '#000',
    },
});

export default NearMeScreen;


