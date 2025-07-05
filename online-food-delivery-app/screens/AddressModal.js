// // screens/AddressModal.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons, Entypo } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const AddressModal = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📍 Elige tu dirección</Text>

//       <TouchableOpacity style={styles.option}>
//         <Ionicons name="add" size={20} color="#f43f5e" style={styles.icon} />
//         <Text style={styles.label}>Nueva dirección</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.option}>
//         <Entypo name="location-pin" size={20} color="#f43f5e" style={styles.icon} />
//         <View>
//           <Text style={styles.label}>Tacna 492, Villa María del Triunfo</Text>
//           <Text style={styles.subLabel}>🇵🇪 Perú</Text>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
//         <Text style={styles.closeText}>Cerrar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 20,
//     color: '#111827',
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   icon: {
//     marginRight: 12,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#374151',
//   },
//   subLabel: {
//     fontSize: 13,
//     color: '#6B7280',
//   },
//   closeBtn: {
//     marginTop: 32,
//     alignItems: 'center',
//   },
//   closeText: {
//     fontSize: 16,
//     color: '#f43f5e',
//     fontWeight: '600',
//   },
// });

// export default AddressModal;
