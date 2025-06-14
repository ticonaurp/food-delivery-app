// data/restaurants.js
export const restaurants = [
  {
    id: '1',
    name: 'Bottega Ristorante',
    rating: 4.6,
    reviews: 1683,
    price: 49,
    distance: '4.6',
    deliveryTime: '15 min',
    description: 'Italian restaurant with various dishes',
    promo: 'Extra discount',
    freeDelivery: true,
    imageUrl: require('../assets/Italian-Restaurants.jpg'),
    menu: {
      Popular: [
        { name: 'Pasta Carbonara', price: 12, image: require('../assets/food/pasta.jpg') },
        { name: 'Margherita Pizza', price: 10, image: require('../assets/food/pizza.jpg') },
      ],
      'Main Courses': [
        { name: 'Risotto alla Milanese', price: 14, image: require('../assets/food/risotto.jpg') },
      ],
      Appetizer: [
        { name: 'Bruschetta', price: 6, image: require('../assets/food/bruschetta.jpg') },
      ],
    },
  },
  {
    id: '2',
    name: 'Soulfood Jakarta',
    rating: 4.3,
    reviews: 1248,
    price: 35,
    distance: '2.8',
    deliveryTime: '20 min',
    description: 'Delicious Indonesian soul food',
    promo: 'Buy 1 Get 1',
    freeDelivery: false,
    imageUrl: require('../assets/soulfood.jpg'),
    menu: {
      Popular: [
        { name: 'Nasi Goreng', price: 9, image: require('../assets/food/nasi_goreng.jpg') },
        { name: 'Ayam Penyet', price: 11, image: require('../assets/food/ayam_penyet.jpg') },
      ],
      'Main Courses': [
        { name: 'Rendang Daging', price: 13, image: require('../assets/food/rendang.jpg') },
      ],
      Appetizer: [
        { name: 'Tahu Goreng', price: 5, image: require('../assets/food/tahu_goreng.jpg') },
      ],
    },
  },
  {
    id: '3',
    name: 'Sushi Kyu',
    rating: 4.8,
    reviews: 1920,
    price: 59,
    distance: '3.1',
    deliveryTime: '18 min',
    description: 'Authentic Japanese sushi and rolls',
    promo: '10% off today',
    freeDelivery: true,
    imageUrl: require('../assets/sushi.png'),
    menu: {
      Popular: [
        { name: 'Salmon Nigiri', price: 15, image: require('../assets/food/salmon_nigiri.jpg') },
        { name: 'California Roll', price: 12, image: require('../assets/food/california_roll.jpg') },
      ],
      'Main Courses': [
        { name: 'Sushi Platter', price: 25, image: require('../assets/food/sushi_platter.jpg') },
      ],
      Appetizer: [
        { name: 'Miso Soup', price: 4, image: require('../assets/food/miso_soup.jpg') },
      ],
    },
  },
  {
    id: '4',
    name: 'El Taco Loco',
    rating: 4.5,
    reviews: 890,
    price: 29,
    distance: '5.2',
    deliveryTime: '25 min',
    description: 'Best tacos and Mexican food in town',
    promo: 'Free drink with any combo',
    freeDelivery: false,
    imageUrl: require('../assets/taco_fiesta.jpg'),
    menu: {
      Popular: [
        { name: 'Taco Al Pastor', price: 8, image: require('../assets/food/taco_al_pastor.jpg') },
        { name: 'Quesadilla', price: 7, image: require('../assets/food/quesadilla.jpg') },
      ],
      'Main Courses': [
        { name: 'Burrito Supremo', price: 11, image: require('../assets/food/burrito.jpg') },
      ],
      Appetizer: [
        { name: 'Nachos con Guacamole', price: 6, image: require('../assets/food/nachos.jpg') },
      ],
    },
  },
];
