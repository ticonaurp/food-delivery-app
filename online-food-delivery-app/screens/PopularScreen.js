// import React from 'react';
// import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
// import { menuItems } from '../data/menuData';
// import Animated, { FadeInRight, ZoomIn, Layout, FadeIn } from 'react-native-reanimated';

// const { width } = Dimensions.get('window');
// const popularDishes = menuItems['Popular'];

// const PopularScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Animated.Text entering={ZoomIn.duration(600)} style={styles.title}>
//         Most Popular Dishes
//       </Animated.Text>
//       <FlatList
//         data={popularDishes}
//         keyExtractor={(item, index) => index.toString()}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item, index }) => (
//           <Animated.View
//             entering={FadeInRight.delay(index * 150)}
//             layout={Layout.springify()}
//             style={styles.card}
//           >
//             <Image source={item.image} style={styles.image} />
//             <View style={styles.details}>
//               <Text style={styles.name}>{item.title}</Text>
//               <Text style={styles.description}>{item.description}</Text>
//               <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
//             </View>
//           </Animated.View>
//         )}
//       />
//     </View>
//   );
// };

// export default PopularScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     backgroundColor: '#fff'
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     color: '#222',
//     alignSelf: 'center'
//   },
//   card: {
//     flexDirection: 'row',
//     marginBottom: 16,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 16,
//     overflow: 'hidden',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderTopLeftRadius: 16,
//     borderBottomLeftRadius: 16
//   },
//   details: {
//     flex: 1,
//     padding: 12,
//     justifyContent: 'center'
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333'
//   },
//   description: {
//     color: '#666',
//     fontSize: 14,
//     marginVertical: 4
//   },
//   price: {
//     color: '#222',
//     fontWeight: '700',
//     fontSize: 15
//   }
// });