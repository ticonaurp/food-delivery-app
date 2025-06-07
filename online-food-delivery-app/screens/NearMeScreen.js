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
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('HomeMain');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailRestoran', { restaurant: item })}>
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
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.detailsText}>
                            Start from {item.price} • {item.distance} • Delivery {item.deliveryTime}
                        </Text>
                        {item.freeDelivery && <Text style={styles.freeDelivery}>Free delivery</Text>}
                        {item.promo && <Text style={styles.promo}>{item.promo}</Text>}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dishes near me</Text>
            <Text style={styles.subHeader}>Dishes Near You</Text>
            <Text style={styles.recommendation}>Discover delicious meals nearby</Text>
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Filter</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Discount promo</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>Recommended</Text></TouchableOpacity>
                <TouchableOpacity onPress={navigateToHome} style={styles.homeButton}>
                    <Text style={styles.homeButtonText}>Home</Text>
                </TouchableOpacity>
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subHeader: {
        fontSize: 14,
        marginBottom: 4,
    },
    recommendation: {
        fontSize: 14,
        marginBottom: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    filterButton: {
        backgroundColor: '#FFCCCC',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        elevation: 2,
    },
    filterText: {
        fontSize: 14,
        color: '#000',
    },
    homeButton: {
        borderColor: '#FFCCCC',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
    },
    homeButtonText: {
        color: '#FFCCCC',
        fontSize: 14,
    },
    card: {
        padding: 10,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderColor: '#eee',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
        marginVertical: 4,
    },
    detailsText: {
        fontSize: 12,
        color: '#666',
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
        fontSize: 14,
    },
    reviewCount: {
        fontSize: 14,
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
});

export default NearMeScreen;
