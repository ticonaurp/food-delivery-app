// // screens/AllDayScreen.js
// import React from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { FontAwesome5 } from '@expo/vector-icons';

// const AllDayScreen = () => {
//   return (
//     <LinearGradient colors={['#FFA726', '#FF7043']} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <View style={styles.header}>
//           <FontAwesome5 name="clock" size={24} color="#fff" />
//           <Text style={styles.title}>All-Day Specials</Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Breakfast Combo</Text>
//           <Text style={styles.cardDescription}>Available until 11 AM</Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Lunch Pack</Text>
//           <Text style={styles.cardDescription}>Served between 12 PM - 3 PM</Text>
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     gap: 10,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FF5722',
//   },
//   cardDescription: {
//     marginTop: 5,
//     fontSize: 14,
//     color: '#555',
//   },
// });

// export default AllDayScreen;
