// // src/screens/DetailItemScreen.js
// import React from "react";
// import { View, Text, StyleSheet, Button } from "react-native";

// const DetailItemScreen = ({ route }) => {
//   const { item } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{item.name}</Text>
//       <Text>{item.description}</Text>
//       <Text>{item.price}</Text>
//       <Button title="Añadir a carrito" onPress={() => {/* lógica de añadir */}} />
//     </View>
//   );
// };

// export default DetailItemScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// });