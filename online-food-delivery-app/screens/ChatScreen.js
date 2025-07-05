// "use client"

// import { useContext, useState } from "react"
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import Ionicons from "@expo/vector-icons/Ionicons"
// import { CartContext } from "../context/CartContext"
// import { FavoritesContext } from "../context/FavoritesContext"
// import StatusBarConfig from "../components/StatusBarConfig"

// export default function FavoritesScreen() {
//   const navigation = useNavigation()
//   const { addToCart } = useContext(CartContext)
//   const {
//     favoriteItems,
//     favoriteRestaurants,
//     toggleFavoriteItem,
//     toggleFavoriteRestaurant,
//     isItemFavorite,
//     isRestaurantFavorite,
//   } = useContext(FavoritesContext)

//   // Estados para funcionalidades avanzadas
//   const [activeTab, setActiveTab] = useState("platos") // "platos", "restaurantes", "colecciones"
//   const [searchQuery, setSearchQuery] = useState("")
//   const [sortBy, setSortBy] = useState("recent") // "recent", "name", "price", "rating"
//   const [filterBy, setFilterBy] = useState("all") // "all", "discounted", "nearby"
//   const [showFilters, setShowFilters] = useState(false)
//   const [selectedItems, setSelectedItems] = useState([])
//   const [isSelectionMode, setIsSelectionMode] = useState(false)
//   const [isSearchFocused, setIsSearchFocused] = useState(false) // ✅ NUEVO ESTADO

//   // Colecciones predefinidas
//   const [collections, setCollections] = useState([
//     {
//       id: "pizza_collection",
//       name: "🍕 Mis Pizzas",
//       description: "Las mejores pizzas que he probado",
//       items: favoriteItems.filter((item) => item.name.toLowerCase().includes("pizza")),
//       color: "#FF6B35",
//     },
//     {
//       id: "burger_collection",
//       name: "🍔 Hamburguesas Top",
//       description: "Mis hamburguesas favoritas",
//       items: favoriteItems.filter((item) => item.name.toLowerCase().includes("burger")),
//       color: "#4ECDC4",
//     },
//     {
//       id: "healthy_collection",
//       name: "🥗 Comida Saludable",
//       description: "Opciones saludables que me encantan",
//       items: favoriteItems.filter(
//         (item) => item.name.toLowerCase().includes("salad") || item.description?.toLowerCase().includes("healthy"),
//       ),
//       color: "#96CEB4",
//     },
//   ])

//   // Filtrar y ordenar datos
//   const getFilteredAndSortedData = () => {
//     let data = activeTab === "platos" ? favoriteItems : favoriteRestaurants

//     // Filtrar por búsqueda
//     if (searchQuery.trim()) {
//       data = data.filter(
//         (item) =>
//           item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (activeTab === "platos" && item.restaurant?.name.toLowerCase().includes(searchQuery.toLowerCase())),
//       )
//     }

//     // Filtrar por tipo
//     if (filterBy === "discounted" && activeTab === "platos") {
//       data = data.filter((item) => item.hasDiscount)
//     } else if (filterBy === "nearby") {
//       data = data.filter((item) => {
//         const distance =
//           activeTab === "platos"
//             ? Number.parseFloat(item.restaurant?.distance?.replace("km", "") || "999")
//             : Number.parseFloat(item.distance?.replace("km", "") || "999")
//         return distance <= 2
//       })
//     }

//     // Ordenar
//     switch (sortBy) {
//       case "name":
//         data.sort((a, b) => a.name.localeCompare(b.name))
//         break
//       case "price":
//         if (activeTab === "platos") {
//           data.sort((a, b) => (a.discountPrice || a.originalPrice || 0) - (b.discountPrice || b.originalPrice || 0))
//         }
//         break
//       case "rating":
//         if (activeTab === "restaurantes") {
//           data.sort((a, b) => (b.rating || 0) - (a.rating || 0))
//         }
//         break
//       default: // recent
//         data.sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0))
//     }

//     return data
//   }

//   const handleAddToCart = (dish) => {
//     addToCart(dish, dish.restaurant)
//   }

//   const handleToggleFavorite = (item) => {
//     if (activeTab === "platos") {
//       toggleFavoriteItem(item, item.restaurant)
//     } else {
//       toggleFavoriteRestaurant(item)
//     }
//   }

//   const handleSelectItem = (item) => {
//     if (selectedItems.includes(item.id)) {
//       setSelectedItems(selectedItems.filter((id) => id !== item.id))
//     } else {
//       setSelectedItems([...selectedItems, item.id])
//     }
//   }

//   const handleBulkRemove = () => {
//     Alert.alert(
//       "Eliminar favoritos",
//       `¿Estás seguro de que quieres eliminar ${selectedItems.length} elementos de favoritos?`,
//       [
//         { text: "Cancelar", style: "cancel" },
//         {
//           text: "Eliminar",
//           style: "destructive",
//           onPress: () => {
//             const data = getFilteredAndSortedData()
//             selectedItems.forEach((itemId) => {
//               const item = data.find((d) => d.id === itemId)
//               if (item) handleToggleFavorite(item)
//             })
//             setSelectedItems([])
//             setIsSelectionMode(false)
//           },
//         },
//       ],
//     )
//   }

//   const handleAddAllToCart = () => {
//     if (activeTab === "platos") {
//       const data = getFilteredAndSortedData()
//       selectedItems.forEach((itemId) => {
//         const item = data.find((d) => d.id === itemId)
//         if (item) handleAddToCart(item)
//       })
//       Alert.alert("¡Agregado!", `${selectedItems.length} platos agregados al carrito`)
//       setSelectedItems([])
//       setIsSelectionMode(false)
//     }
//   }

//   const renderFavoriteItem = ({ item: dish }) => (
//     <TouchableOpacity
//       style={[styles.favoriteItem, selectedItems.includes(dish.id) && styles.selectedItem]}
//       onPress={() => (isSelectionMode ? handleSelectItem(dish) : null)}
//       onLongPress={() => {
//         if (!isSelectionMode) {
//           setIsSelectionMode(true)
//           setSelectedItems([dish.id])
//         }
//       }}
//     >
//       {isSelectionMode && (
//         <View style={styles.selectionIndicator}>
//           <Ionicons
//             name={selectedItems.includes(dish.id) ? "checkmark-circle" : "ellipse-outline"}
//             size={24}
//             color={selectedItems.includes(dish.id) ? "#4CAF50" : "#8E8E93"}
//           />
//         </View>
//       )}

//       <Image source={{ uri: dish.image }} style={styles.itemImage} />

//       <View style={styles.itemInfo}>
//         <View style={styles.itemHeader}>
//           <Text style={styles.itemName}>{dish.name}</Text>
//           {dish.hasDiscount && (
//             <View style={styles.discountBadge}>
//               <Text style={styles.discountText}>
//                 -{Math.round(((dish.originalPrice - dish.discountPrice) / dish.originalPrice) * 100)}%
//               </Text>
//             </View>
//           )}
//         </View>

//         <Text style={styles.itemRestaurant}>{dish.restaurant.name}</Text>
//         <Text style={styles.itemDescription} numberOfLines={2}>
//           {dish.description}
//         </Text>

//         <View style={styles.itemFooter}>
//           <View style={styles.priceContainer}>
//             {dish.hasDiscount ? (
//               <>
//                 <Text style={styles.originalPrice}>Rp {dish.originalPrice?.toLocaleString()}</Text>
//                 <Text style={styles.discountPrice}>Rp {dish.discountPrice?.toLocaleString()}</Text>
//               </>
//             ) : (
//               <Text style={styles.price}>Rp {(dish.price || dish.originalPrice)?.toLocaleString()}</Text>
//             )}
//           </View>

//           {!isSelectionMode && (
//             <View style={styles.itemActions}>
//               <TouchableOpacity style={styles.favoriteButton} onPress={() => handleToggleFavorite(dish)}>
//                 <Ionicons name="heart" size={20} color="#E94864" />
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(dish)}>
//                 <Ionicons name="add" size={20} color="#FFFFFF" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   const renderFavoriteRestaurant = ({ item: restaurant }) => (
//     <TouchableOpacity
//       style={[styles.restaurantItem, selectedItems.includes(restaurant.id) && styles.selectedItem]}
//       onPress={() =>
//         isSelectionMode ? handleSelectItem(restaurant) : navigation.navigate("RestaurantDetail", { restaurant })
//       }
//       onLongPress={() => {
//         if (!isSelectionMode) {
//           setIsSelectionMode(true)
//           setSelectedItems([restaurant.id])
//         }
//       }}
//     >
//       {isSelectionMode && (
//         <View style={styles.restaurantSelectionIndicator}>
//           <Ionicons
//             name={selectedItems.includes(restaurant.id) ? "checkmark-circle" : "ellipse-outline"}
//             size={24}
//             color={selectedItems.includes(restaurant.id) ? "#4CAF50" : "#8E8E93"}
//           />
//         </View>
//       )}

//       <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />

//       <View style={styles.restaurantInfo}>
//         <View style={styles.restaurantHeader}>
//           <Text style={styles.restaurantName}>{restaurant.name}</Text>
//           {!isSelectionMode && (
//             <TouchableOpacity style={styles.favoriteButton} onPress={() => handleToggleFavorite(restaurant)}>
//               <Ionicons name="heart" size={20} color="#E94864" />
//             </TouchableOpacity>
//           )}
//         </View>

//         <Text style={styles.restaurantType}>{restaurant.type}</Text>

//         <View style={styles.restaurantStats}>
//           <View style={styles.statItem}>
//             <Ionicons name="star" size={14} color="#FFD700" />
//             <Text style={styles.statText}>{restaurant.rating}</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Ionicons name="time" size={14} color="#8E8E93" />
//             <Text style={styles.statText}>{restaurant.deliveryTime}</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Ionicons name="location" size={14} color="#8E8E93" />
//             <Text style={styles.statText}>{restaurant.distance}</Text>
//           </View>
//         </View>

//         {restaurant.freeDelivery && (
//           <View style={styles.freeDeliveryBadge}>
//             <Text style={styles.freeDeliveryText}>Envío Gratis</Text>
//           </View>
//         )}

//         {restaurant.promo && (
//           <View style={styles.promoBadge}>
//             <Text style={styles.promoText}>Promoción</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   )

//   const renderCollection = ({ item: collection }) => (
//     <TouchableOpacity style={styles.collectionItem}>
//       <View style={[styles.collectionIcon, { backgroundColor: collection.color + "20" }]}>
//         <Text style={styles.collectionEmoji}>{collection.name.split(" ")[0]}</Text>
//       </View>
//       <View style={styles.collectionInfo}>
//         <Text style={styles.collectionName}>{collection.name.substring(2)}</Text>
//         <Text style={styles.collectionDescription}>{collection.description}</Text>
//         <Text style={styles.collectionCount}>{collection.items.length} elementos</Text>
//       </View>
//       <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
//     </TouchableOpacity>
//   )

//   const renderFiltersModal = () =>
//     showFilters && (
//       <View style={styles.filtersOverlay}>
//         <TouchableWithoutFeedback onPress={() => setShowFilters(false)}>
//           <View style={styles.filtersOverlayBackground} />
//         </TouchableWithoutFeedback>
//         <View style={styles.filtersModal}>
//           <View style={styles.filtersHeader}>
//             <Text style={styles.filtersTitle}>Filtros y Ordenamiento</Text>
//             <TouchableOpacity onPress={() => setShowFilters(false)}>
//               <Ionicons name="close" size={24} color="#1D1D1F" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.filterSection}>
//             <Text style={styles.filterSectionTitle}>Ordenar por:</Text>
//             {[
//               { key: "recent", label: "Más recientes" },
//               { key: "name", label: "Nombre A-Z" },
//               ...(activeTab === "platos" ? [{ key: "price", label: "Precio" }] : []),
//               ...(activeTab === "restaurantes" ? [{ key: "rating", label: "Calificación" }] : []),
//             ].map((option) => (
//               <TouchableOpacity
//                 key={option.key}
//                 style={[styles.filterOption, sortBy === option.key && styles.selectedFilter]}
//                 onPress={() => setSortBy(option.key)}
//               >
//                 <Text style={[styles.filterOptionText, sortBy === option.key && styles.selectedFilterText]}>
//                   {option.label}
//                 </Text>
//                 {sortBy === option.key && <Ionicons name="checkmark" size={20} color="#E94864" />}
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View style={styles.filterSection}>
//             <Text style={styles.filterSectionTitle}>Filtrar por:</Text>
//             {[
//               { key: "all", label: "Todos" },
//               ...(activeTab === "platos" ? [{ key: "discounted", label: "Con descuento" }] : []),
//               { key: "nearby", label: "Cercanos (< 2km)" },
//             ].map((option) => (
//               <TouchableOpacity
//                 key={option.key}
//                 style={[styles.filterOption, filterBy === option.key && styles.selectedFilter]}
//                 onPress={() => setFilterBy(option.key)}
//               >
//                 <Text style={[styles.filterOptionText, filterBy === option.key && styles.selectedFilterText]}>
//                   {option.label}
//                 </Text>
//                 {filterBy === option.key && <Ionicons name="checkmark" size={20} color="#E94864" />}
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </View>
//     )

//   // ✅ ESTADO VACÍO MEJORADO CON MANEJO DE TECLADO
//   const renderEmptyState = () => (
//     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.emptyKeyboardContainer}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={[styles.emptyContainer, isSearchFocused && styles.emptyContainerWithKeyboard]}>
//           <View style={styles.emptyIconContainer}>
//             <Ionicons
//               name={
//                 activeTab === "platos"
//                   ? "restaurant-outline"
//                   : activeTab === "restaurantes"
//                     ? "storefront-outline"
//                     : "albums-outline"
//               }
//               size={60}
//               color="#E94864"
//             />
//           </View>
//           <Text style={styles.emptyTitle}>
//             {activeTab === "platos" && "No tienes platos favoritos"}
//             {activeTab === "restaurantes" && "No tienes restaurantes favoritos"}
//             {activeTab === "colecciones" && "No tienes colecciones"}
//           </Text>
//           <Text style={styles.emptySubtitle}>
//             {activeTab === "platos" && "Explora nuestro menú y marca tus platos favoritos"}
//             {activeTab === "restaurantes" && "Descubre restaurantes increíbles y márcalos como favoritos"}
//             {activeTab === "colecciones" && "Crea colecciones personalizadas de tus favoritos"}
//           </Text>
//           {!isSearchFocused && (
//             <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate("Inicio")}>
//               <Text style={styles.exploreButtonText}>Explorar ahora</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   )

//   const filteredData = getFilteredAndSortedData()

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBarConfig />

//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Ionicons name="arrow-back" size={24} color="#1D1D1F" />
//           </TouchableOpacity>
//           <Text style={styles.title}>Mis Favoritos</Text>
//           <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
//             <Ionicons name="options" size={24} color="#1D1D1F" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.subtitle}>{favoriteItems.length + favoriteRestaurants.length} favoritos en total</Text>
//       </View>

//       {/* ✅ BARRA DE BÚSQUEDA CON MANEJO DE TECLADO */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#8E8E93" />
//         <TextInput
//           style={styles.searchInput}
//           placeholder={`Buscar ${activeTab}...`}
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           placeholderTextColor="#8E8E93"
//           onFocus={() => setIsSearchFocused(true)}
//           onBlur={() => setIsSearchFocused(false)}
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity onPress={() => setSearchQuery("")}>
//             <Ionicons name="close-circle" size={20} color="#8E8E93" />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {[
//             { key: "platos", label: `Platos (${favoriteItems.length})`, icon: "restaurant" },
//             { key: "restaurantes", label: `Restaurantes (${favoriteRestaurants.length})`, icon: "storefront" },
//             { key: "colecciones", label: `Colecciones (${collections.length})`, icon: "albums" },
//           ].map((tab) => (
//             <TouchableOpacity
//               key={tab.key}
//               style={[styles.tab, activeTab === tab.key && styles.activeTab]}
//               onPress={() => {
//                 setActiveTab(tab.key)
//                 setIsSelectionMode(false)
//                 setSelectedItems([])
//               }}
//             >
//               <Ionicons
//                 name={tab.icon}
//                 size={16}
//                 color={activeTab === tab.key ? "#FFFFFF" : "#8E8E93"}
//                 style={styles.tabIcon}
//               />
//               <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Modo selección - Barra de acciones */}
//       {isSelectionMode && (
//         <View style={styles.selectionBar}>
//           <TouchableOpacity
//             style={styles.selectionAction}
//             onPress={() => {
//               setIsSelectionMode(false)
//               setSelectedItems([])
//             }}
//           >
//             <Text style={styles.selectionActionText}>Cancelar</Text>
//           </TouchableOpacity>

//           <Text style={styles.selectionCount}>{selectedItems.length} seleccionados</Text>

//           <View style={styles.selectionActions}>
//             {activeTab === "platos" && (
//               <TouchableOpacity style={styles.selectionActionButton} onPress={handleAddAllToCart}>
//                 <Ionicons name="bag-add" size={20} color="#4CAF50" />
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity style={styles.selectionActionButton} onPress={handleBulkRemove}>
//               <Ionicons name="trash" size={20} color="#FF4444" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* ✅ CONTENIDO CON MANEJO DE TECLADO */}
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.contentInner}>
//             {activeTab === "platos" ? (
//               filteredData.length > 0 ? (
//                 <FlatList
//                   data={filteredData}
//                   renderItem={renderFavoriteItem}
//                   keyExtractor={(item) => item.id}
//                   contentContainerStyle={styles.listContainer}
//                   showsVerticalScrollIndicator={false}
//                   keyboardShouldPersistTaps="handled"
//                 />
//               ) : (
//                 renderEmptyState()
//               )
//             ) : activeTab === "restaurantes" ? (
//               filteredData.length > 0 ? (
//                 <FlatList
//                   data={filteredData}
//                   renderItem={renderFavoriteRestaurant}
//                   keyExtractor={(item) => item.id}
//                   contentContainerStyle={styles.listContainer}
//                   showsVerticalScrollIndicator={false}
//                   keyboardShouldPersistTaps="handled"
//                 />
//               ) : (
//                 renderEmptyState()
//               )
//             ) : // Colecciones
//             collections.length > 0 ? (
//               <FlatList
//                 data={collections}
//                 renderItem={renderCollection}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.listContainer}
//                 showsVerticalScrollIndicator={false}
//                 keyboardShouldPersistTaps="handled"
//               />
//             ) : (
//               renderEmptyState()
//             )}
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>

//       {/* Modal de filtros */}
//       {renderFiltersModal()}
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//   },
//   header: {
//     padding: 20,
//     backgroundColor: "#FFFFFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E5E7",
//   },
//   headerTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   backButton: {
//     padding: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1D1D1F",
//   },
//   filterButton: {
//     padding: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#8E8E93",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     marginHorizontal: 20,
//     marginVertical: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#1D1D1F",
//     marginLeft: 8,
//   },
//   tabsContainer: {
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E5E7",
//   },
//   tab: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     backgroundColor: "#F2F2F7",
//     marginRight: 12,
//   },
//   activeTab: {
//     backgroundColor: "#E94864",
//   },
//   tabIcon: {
//     marginRight: 6,
//   },
//   tabText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#8E8E93",
//   },
//   activeTabText: {
//     color: "#FFFFFF",
//   },
//   selectionBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
//   selectionAction: {
//     padding: 8,
//   },
//   selectionActionText: {
//     color: "#FFFFFF",
//     fontWeight: "600",
//   },
//   selectionCount: {
//     color: "#FFFFFF",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   selectionActions: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   selectionActionButton: {
//     padding: 8,
//   },
//   // ✅ ESTILOS MEJORADOS PARA MANEJO DE TECLADO
//   content: {
//     flex: 1,
//   },
//   contentInner: {
//     flex: 1,
//   },
//   emptyKeyboardContainer: {
//     flex: 1,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 40,
//     paddingVertical: 60,
//   },
//   // ✅ ESTILO CUANDO EL TECLADO ESTÁ ACTIVO
//   emptyContainerWithKeyboard: {
//     justifyContent: "flex-start",
//     paddingTop: 40,
//   },
//   listContainer: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   favoriteItem: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   selectedItem: {
//     borderWidth: 2,
//     borderColor: "#4CAF50",
//   },
//   selectionIndicator: {
//     marginRight: 12,
//     alignSelf: "center",
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     backgroundColor: "#F2F2F7",
//   },
//   itemInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   itemHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 4,
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1D1D1F",
//     flex: 1,
//   },
//   discountBadge: {
//     backgroundColor: "#FF4444",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     marginLeft: 8,
//   },
//   discountText: {
//     color: "#FFFFFF",
//     fontSize: 10,
//     fontWeight: "600",
//   },
//   itemRestaurant: {
//     fontSize: 14,
//     color: "#E94864",
//     marginBottom: 4,
//   },
//   itemDescription: {
//     fontSize: 14,
//     color: "#8E8E93",
//     lineHeight: 18,
//     marginBottom: 8,
//   },
//   itemFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   priceContainer: {
//     flex: 1,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#E94864",
//   },
//   originalPrice: {
//     fontSize: 14,
//     color: "#8E8E93",
//     textDecorationLine: "line-through",
//   },
//   discountPrice: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#E94864",
//   },
//   itemActions: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   favoriteButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#FFE8EC",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   addButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#E94864",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   restaurantItem: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     marginBottom: 12,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   restaurantSelectionIndicator: {
//     position: "absolute",
//     top: 12,
//     left: 12,
//     zIndex: 10,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 4,
//   },
//   restaurantImage: {
//     width: "100%",
//     height: 150,
//     backgroundColor: "#F2F2F7",
//   },
//   restaurantInfo: {
//     padding: 16,
//   },
//   restaurantHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 8,
//   },
//   restaurantName: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1D1D1F",
//     flex: 1,
//   },
//   restaurantType: {
//     fontSize: 14,
//     color: "#8E8E93",
//     marginBottom: 12,
//   },
//   restaurantStats: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   statItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 16,
//   },
//   statText: {
//     fontSize: 14,
//     color: "#8E8E93",
//     marginLeft: 4,
//   },
//   freeDeliveryBadge: {
//     alignSelf: "flex-start",
//     backgroundColor: "#4CAF50",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   freeDeliveryText: {
//     color: "#FFFFFF",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   promoBadge: {
//     alignSelf: "flex-start",
//     backgroundColor: "#FF6B35",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginTop: 4,
//   },
//   promoText: {
//     color: "#FFFFFF",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   collectionItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   collectionIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 16,
//   },
//   collectionEmoji: {
//     fontSize: 24,
//   },
//   collectionInfo: {
//     flex: 1,
//   },
//   collectionName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1D1D1F",
//     marginBottom: 4,
//   },
//   collectionDescription: {
//     fontSize: 14,
//     color: "#8E8E93",
//     marginBottom: 4,
//   },
//   collectionCount: {
//     fontSize: 12,
//     color: "#E94864",
//     fontWeight: "600",
//   },
//   filtersOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 1000,
//     justifyContent: "flex-end",
//   },
//   filtersOverlayBackground: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   filtersModal: {
//     backgroundColor: "#FFFFFF",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingBottom: 40,
//   },
//   filtersHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E5E7",
//   },
//   filtersTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1D1D1F",
//   },
//   filterSection: {
//     padding: 20,
//   },
//   filterSectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1D1D1F",
//     marginBottom: 12,
//   },
//   filterOption: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   selectedFilter: {
//     backgroundColor: "#FFE8EC",
//   },
//   filterOptionText: {
//     fontSize: 16,
//     color: "#1D1D1F",
//   },
//   selectedFilterText: {
//     color: "#E94864",
//     fontWeight: "600",
//   },
//   emptyIconContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#FFE8EC",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1D1D1F",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: "#8E8E93",
//     textAlign: "center",
//     lineHeight: 24,
//     marginBottom: 32,
//   },
//   exploreButton: {
//     backgroundColor: "#E94864",
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   exploreButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// })
