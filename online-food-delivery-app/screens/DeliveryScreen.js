// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import categories from "../data/categories"
// import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
// import { formatearSoles } from "../utils/currencyUtils"

// const HomeScreen = ({ navigation }) => {
//   const renderCategory = ({ item, index }) => (
//     <Animated.View entering={FadeInUp.delay(index * 100)}>
//       <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate("NearMeScreen")}>
//         <Ionicons name={item.icon} size={24} color="#E94864" />
//         <Text style={styles.categoryTitle}>{item.name}</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   )

//   return (
//     <View style={styles.container}>
//       <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
//         <Ionicons name="location" size={20} color="#E94864" />
//         <Text style={styles.address}>Gunawanwan street No.14</Text>
//       </Animated.View>

//       <Animated.Text entering={FadeInDown.delay(150).duration(400)} style={styles.heading}>
//         ¿Qué te gustaría comer?
//       </Animated.Text>

//       <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.walletContainer}>
// <Text style={styles.walletText}>Wallet: {formatearSoles(wallet)}</Text>
//         <Text style={styles.coinsText}>Coins: 1,200</Text>
//       </Animated.View>

//       <FlatList
//         data={categories}
//         renderItem={renderCategory}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.categoryList}
//       />

//       {/* Sección de Promociones */}
//       <Animated.Text entering={FadeInDown.delay(400).duration(400)} style={styles.sectionTitle}>
//         Promociones disponibles
//       </Animated.Text>
//       <Animated.View entering={FadeInDown.delay(500).duration(400)}>
//         <TouchableOpacity style={styles.promotionCard}>
//           <Text style={styles.promotionText}>5% OFF en Menús del día</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   )
// }

// export default HomeScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 16,
//     paddingTop: 50, // Safe area
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   address: {
//     fontSize: 16,
//     marginLeft: 8,
//     color: "#333",
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 16,
//     color: "#333",
//   },
//   walletContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   walletText: {
//     fontWeight: "600",
//     color: "#444",
//   },
//   coinsText: {
//     fontWeight: "600",
//     color: "#FFD700",
//   },
//   categoryList: {
//     paddingBottom: 16,
//   },
//   categoryCard: {
//     backgroundColor: "#f9f9f9",
//     borderRadius: 16,
//     padding: 20,
//     marginRight: 12,
//     alignItems: "center",
//     width: 100,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   categoryTitle: {
//     fontSize: 14,
//     marginTop: 8,
//     textAlign: "center",
//     color: "#333",
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 24,
//     marginBottom: 16,
//     color: "#333",
//   },
//   promotionCard: {
//     backgroundColor: "#E94864",
//     padding: 20,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   promotionText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
// })
