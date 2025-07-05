// "use client"

// import { useState, useEffect, useContext } from "react"
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import Ionicons from "@expo/vector-icons/Ionicons"
// import { CartContext } from "../context/CartContext"
// import { FavoritesContext } from "../context/FavoritesContext"
// import { getFilteredDishes } from "../data/restaurants"
// import StatusBarConfig from "../components/StatusBarConfig"

// export default function PopularScreen() {
//   const navigation = useNavigation()
//   const { addToCart } = useContext(CartContext)
//   const { toggleFavoriteItem, isItemFavorite } = useContext(FavoritesContext)

//   const [dishes, setDishes] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     loadPopularDishes()
//   }, [])

//   const loadPopularDishes = async () => {
//     try {
//       setLoading(true)
//       await new Promise((resolve) => setTimeout(resolve, 500))
//       const popularDishes = getFilteredDishes("popular")
//       setDishes(popularDishes)
//     } catch (error) {
//       console.error("Error loading popular dishes:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddToCart = (dish) => {
//     addToCart(dish, dish.restaurant)
//   }

//   const handleToggleFavorite = (dish) => {
//     toggleFavoriteItem(dish, dish.restaurant)
//   }

//   const renderDish = ({ item: dish }) => (
//     <View style={styles.dishCard}>
//       <Image source={{ uri: dish.image }} style={styles.dishImage} />

//       <TouchableOpacity style={styles.favoriteButton} onPress={() => handleToggleFavorite(dish)} activeOpacity={0.7}>
//         <Ionicons
//           name={isItemFavorite(dish.id) ? "heart" : "heart-outline"}
//           size={18}
//           color={isItemFavorite(dish.id) ? "#E94864" : "#8E8E93"}
//         />
//       </TouchableOpacity>

//       <View style={styles.dishInfo}>
//         <View style={styles.dishHeader}>
//           <Text style={styles.dishName}>{dish.name}</Text>
//           {dish.hasDiscount && (
//             <View style={styles.discountBadge}>
//               <Text style={styles.discountText}>
//                 -{Math.round(((dish.originalPrice - dish.discountPrice) / dish.originalPrice) * 100)}%
//               </Text>
//             </View>
//           )}
//         </View>

//         <Text style={styles.dishDescription} numberOfLines={2}>
//           {dish.description}
//         </Text>

//         <View style={styles.restaurantInfo}>
//           <Ionicons name="storefront-outline" size={14} color="#8E8E93" />
//           <Text style={styles.restaurantName}>{dish.restaurant.name}</Text>
//           <Text style={styles.restaurantDistance}>• {dish.restaurant.distance}</Text>
//         </View>

//         <View style={styles.priceRow}>
//           <View style={styles.priceContainer}>
//             {dish.hasDiscount ? (
//               <>
//                 <Text style={styles.originalPrice}>Rp {dish.originalPrice.toLocaleString()}</Text>
//                 <Text style={styles.discountPrice}>Rp {dish.discountPrice.toLocaleString()}</Text>
//               </>
//             ) : (
//               <Text style={styles.price}>Rp {dish.originalPrice.toLocaleString()}</Text>
//             )}
//           </View>

//           <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(dish)}>
//             <Ionicons name="add" size={20} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   )

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBarConfig />
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#E94864" />
//           <Text style={styles.loadingText}>Cargando platos populares...</Text>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBarConfig />

//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Platos Populares</Text>
//         <View style={styles.placeholder} />
//       </View>

//       <FlatList
//         data={dishes}
//         renderItem={renderDish}
//         keyExtractor={(item) => item.uniqueId}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//       />
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 20,
//     backgroundColor: "#FFFFFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E5E7",
//   },
//   backButton: {
//     padding: 8,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1D1D1F",
//   },
//   placeholder: {
//     width: 40,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: "#8E8E93",
//   },
//   listContainer: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   row: {
//     justifyContent: "space-between",
//   },
//   dishCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     marginBottom: 16,
//     width: "48%",
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   dishImage: {
//     width: "100%",
//     height: 120,
//     backgroundColor: "#F2F2F7",
//   },
//   favoriteButton: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   dishInfo: {
//     padding: 12,
//   },
//   dishHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 6,
//   },
//   dishName: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#1D1D1F",
//     flex: 1,
//   },
//   discountBadge: {
//     backgroundColor: "#FF4444",
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     borderRadius: 3,
//     marginLeft: 4,
//   },
//   discountText: {
//     color: "#FFFFFF",
//     fontSize: 9,
//     fontWeight: "600",
//   },
//   dishDescription: {
//     fontSize: 12,
//     color: "#8E8E93",
//     lineHeight: 16,
//     marginBottom: 8,
//   },
//   restaurantInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   restaurantName: {
//     fontSize: 12,
//     color: "#8E8E93",
//     marginLeft: 4,
//   },
//   restaurantDistance: {
//     fontSize: 12,
//     color: "#8E8E93",
//   },
//   priceRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   priceContainer: {
//     flex: 1,
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#E94864",
//   },
//   originalPrice: {
//     fontSize: 12,
//     color: "#8E8E93",
//     textDecorationLine: "line-through",
//   },
//   discountPrice: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#E94864",
//   },
//   addButton: {
//     backgroundColor: "#E94864",
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// })
