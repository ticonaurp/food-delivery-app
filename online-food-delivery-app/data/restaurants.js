// RESTAURANTES EXPANDIDOS - Más variedad para todos los filtros
export const restaurants = [
  {
    id: "1",
    name: "Burger Palace",
    type: "American • Fast Food",
    image:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 120,
    distance: "0.5km",
    deliveryTime: "15-20 min",
    deliveryFee: "S/ 5",
    promo: true,
    freeDelivery: false,
    price: 25,
    description: "Delicious burgers and fries",
    address: "Jl. Sudirman No. 123, Jakarta",
    variants: 8,
    priceRange: "S/ 15-40",
    hours: "8AM-10PM",
    isWeeklyDeal: true,
    isDailyDeal: true,
    isTrending: true,
    isClientFavorite: true,
    category: "comidaRapida",
    discounts: [
      {
        id: "1",
        title: "F&B discount 75%",
        description: "Discounts for all menus",
        type: "discount",
        color: "#FF4444",
      },
    ],
    popularDishes: [
      {
        id: "burger_1",
        name: "Classic Burger",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
        originalPrice: 22,
        discountPrice: 18,
        hasDiscount: true,
        description: "Juicy beef patty with fresh lettuce and tomato",
        category: "burger",
        isWeeklyDeal: true,
        isDailyDeal: true,
        isTrending: true,
      },
      {
        id: "burger_2",
        name: "Cheese Fries",
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop",
        originalPrice: 12,
        discountPrice: 10,
        hasDiscount: true,
        description: "Crispy fries topped with melted cheese",
        category: "sides",
        isWeeklyDeal: true,
      },
      {
        id: "burger_3",
        name: "BBQ Bacon Burger",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop",
        originalPrice: 28,
        discountPrice: 22,
        hasDiscount: true,
        description: "Smoky BBQ sauce with crispy bacon",
        category: "burger",
        isTrending: true,
        isClientFavorite: true,
      },
      {
        id: "burger_4",
        name: "Chicken Wings",
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=200&h=200&fit=crop",
        originalPrice: 18,
        discountPrice: 15,
        hasDiscount: true,
        description: "Spicy buffalo wings with ranch dip",
        category: "chicken",
        isClientFavorite: true,
      },
    ],
  },
  {
    id: "2",
    name: "Pizza Corner",
    type: "Italian • Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    distance: "1.2km",
    deliveryTime: "20-25 min",
    deliveryFee: "S/ 8",
    promo: false,
    freeDelivery: true,
    price: 35,
    description: "Authentic Italian pizza",
    address: "Jl. Thamrin No. 456, Jakarta",
    variants: 12,
    priceRange: "S/ 25-60",
    hours: "10AM-11PM",
    isWeeklyDeal: true,
    isDailyDeal: false,
    isTrending: true,
    isClientFavorite: true,
    category: "comidaRapida",
    discounts: [
      {
        id: "1",
        title: "Buy 1 Get 1",
        description: "Special offer for pizza",
        type: "discount",
        color: "#FF4444",
      },
    ],
    popularDishes: [
      {
        id: "pizza_1",
        name: "Margherita Pizza",
        image:
          "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop",
        originalPrice: 32,
        discountPrice: 26,
        hasDiscount: true,
        description: "Classic tomato, mozzarella and basil",
        category: "pizza",
        isWeeklyDeal: true,
        isClientFavorite: true,
      },
      {
        id: "pizza_2",
        name: "Pepperoni Pizza",
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop",
        originalPrice: 36,
        discountPrice: 30,
        hasDiscount: true,
        description: "Spicy pepperoni with mozzarella cheese",
        category: "pizza",
        isTrending: true,
      },
      {
        id: "pizza_3",
        name: "Hawaiian Pizza",
        image:
          "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=200&fit=crop",
        originalPrice: 34,
        discountPrice: 28,
        hasDiscount: true,
        description: "Ham and pineapple with cheese",
        category: "pizza",
        isDailyDeal: true,
      },
      {
        id: "pizza_4",
        name: "Garlic Bread",
        image:
          "https://images.unsplash.com/photo-1619985632461-f33748ef8d3d?w=200&h=200&fit=crop",
        originalPrice: 10,
        discountPrice: 8,
        hasDiscount: true,
        description: "Crispy bread with garlic butter",
        category: "sides",
      },
    ],
  },
  {
    id: "3",
    name: "Sushi Master",
    type: "Japanese • Sushi",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 156,
    distance: "2.1km",
    deliveryTime: "25-30 min",
    deliveryFee: "S/ 12",
    promo: true,
    freeDelivery: false,
    price: 55,
    description: "Fresh sushi and sashimi",
    address: "Jl. Kemang No. 789, Jakarta",
    variants: 15,
    priceRange: "S/ 30-90",
    hours: "11AM-9PM",
    isWeeklyDeal: false,
    isDailyDeal: true,
    isTrending: true,
    isClientFavorite: true,
    category: "bebidas",
    discounts: [
      {
        id: "1",
        title: "Happy Hour 50%",
        description: "Discount from 2-5 PM",
        type: "discount",
        color: "#FF4444",
      },
    ],
    popularDishes: [
      {
        id: "sushi_1",
        name: "Salmon Roll",
        image:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=200&fit=crop",
        originalPrice: 38,
        discountPrice: 32,
        hasDiscount: true,
        description: "Fresh salmon with avocado and cucumber",
        category: "sushi",
        isClientFavorite: true,
        isTrending: true,
      },
      {
        id: "sushi_2",
        name: "Tuna Sashimi",
        image:
          "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=200&h=200&fit=crop",
        originalPrice: 45,
        discountPrice: 38,
        hasDiscount: true,
        description: "Premium tuna sashimi slices",
        category: "sashimi",
        isDailyDeal: true,
      },
      {
        id: "sushi_3",
        name: "California Roll",
        image:
          "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=200&h=200&fit=crop",
        originalPrice: 28,
        discountPrice: 22,
        hasDiscount: true,
        description: "Crab, avocado and cucumber roll",
        category: "sushi",
        isWeeklyDeal: true,
      },
      {
        id: "sushi_4",
        name: "Miso Soup",
        image:
          "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&h=200&fit=crop",
        originalPrice: 10,
        discountPrice: 8,
        hasDiscount: true,
        description: "Traditional Japanese miso soup",
        category: "soup",
      },
    ],
  },
  {
    id: "4",
    name: "24/7 Express",
    type: "Fast Food • 24 Hours",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 203,
    distance: "0.8km",
    deliveryTime: "10-15 min",
    deliveryFee: "S/ 3",
    promo: true,
    freeDelivery: true,
    price: 15,
    description: "Quick bites available 24/7",
    address: "Jl. Gatot Subroto No. 321, Jakarta",
    variants: 20,
    priceRange: "S/ 8-25",
    hours: "24/7",
    isWeeklyDeal: true,
    isDailyDeal: true,
    isTrending: false,
    isClientFavorite: false,
    category: "comidaRapida",
    discounts: [
      {
        id: "1",
        title: "Night Owl 40%",
        description: "Midnight to 6AM discount",
        type: "discount",
        color: "#FF4444",
      },
    ],
    popularDishes: [
      {
        id: "express_1",
        name: "Midnight Burger",
        image:
          "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop",
        originalPrice: 18,
        discountPrice: 12,
        hasDiscount: true,
        description: "Perfect for late night cravings",
        category: "burger",
        isDailyDeal: true,
      },
      {
        id: "express_2",
        name: "Energy Wrap",
        image:
          "https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=200&h=200&fit=crop",
        originalPrice: 14,
        discountPrice: 10,
        hasDiscount: true,
        description: "Healthy wrap with chicken and veggies",
        category: "wrap",
        isWeeklyDeal: true,
      },
      {
        id: "express_3",
        name: "Coffee & Donut Combo",
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop",
        originalPrice: 10,
        discountPrice: 7,
        hasDiscount: true,
        description: "Perfect morning starter",
        category: "combo",
      },
      {
        id: "express_4",
        name: "Quick Noodles",
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop",
        originalPrice: 12,
        discountPrice: 8,
        hasDiscount: true,
        description: "Instant ramen with extra toppings",
        category: "noodles",
      },
    ],
  },
  {
    id: "5",
    name: "Lightning Kitchen",
    type: "Asian • Super Fast",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 178,
    distance: "0.3km",
    deliveryTime: "8-12 min",
    deliveryFee: "S/ 2",
    promo: true,
    freeDelivery: false,
    price: 20,
    description: "Lightning fast Asian cuisine",
    address: "Jl. Rasuna Said No. 567, Jakarta",
    variants: 16,
    priceRange: "S/ 12-40",
    hours: "6AM-2AM",
    isWeeklyDeal: false,
    isDailyDeal: true,
    isTrending: true,
    isClientFavorite: true,
    category: "bebidas",
    discounts: [
      {
        id: "1",
        title: "Flash Sale 60%",
        description: "Limited time mega discount",
        type: "discount",
        color: "#FF4444",
      },
    ],
    popularDishes: [
      {
        id: "lightning_1",
        name: "Flash Fried Rice",
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop",
        originalPrice: 16,
        discountPrice: 10,
        hasDiscount: true,
        description: "Wok-fried rice with mixed vegetables",
        category: "rice",
        isTrending: true,
      },
      {
        id: "lightning_2",
        name: "Speed Ramen",
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop",
        originalPrice: 18,
        discountPrice: 12,
        hasDiscount: true,
        description: "Rich tonkotsu broth with chashu",
        category: "ramen",
        isClientFavorite: true,
      },
      {
        id: "lightning_3",
        name: "Quick Dumplings",
        image:
          "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=200&h=200&fit=crop",
        originalPrice: 14,
        discountPrice: 9,
        hasDiscount: true,
        description: "Steamed pork and chive dumplings",
        category: "dumplings",
        isDailyDeal: true,
      },
      {
        id: "lightning_4",
        name: "Instant Pad Thai",
        image:
          "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=200&h=200&fit=crop",
        originalPrice: 15,
        discountPrice: 10,
        hasDiscount: true,
        description: "Authentic Thai stir-fried noodles",
        category: "noodles",
      },
    ],
  },
  {
    id: "6",
    name: "Mega Discount Diner",
    type: "American • Huge Savings",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 267,
    distance: "1.5km",
    deliveryTime: "18-22 min",
    deliveryFee: "S/ 6",
    promo: true,
    freeDelivery: false,
    price: 12,
    description: "Biggest discounts in town",
    address: "Jl. Kuningan No. 890, Jakarta",
    variants: 25,
    priceRange: "S/ 8-30",
    hours: "24/7",
    isWeeklyDeal: true,
    isDailyDeal: false,
    isTrending: false,
    isClientFavorite: false,
    category: "postres",
    discounts: [
      {
        id: "1",
        title: "Mega Sale 80%",
        description: "Unbeatable prices all day",
        type: "discount",
        color: "#FF4444",
      },
    ],
    popularDishes: [
      {
        id: "mega_1",
        name: "Giant Burger Deal",
        image:
          "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=200&h=200&fit=crop",
        originalPrice: 28,
        discountPrice: 10,
        hasDiscount: true,
        description: "Double patty burger with fries and drink",
        category: "combo",
        isWeeklyDeal: true,
      },
      {
        id: "mega_2",
        name: "Family Pizza Pack",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop",
        originalPrice: 60,
        discountPrice: 18,
        hasDiscount: true,
        description: "Large pizza with 4 toppings",
        category: "pizza",
      },
      {
        id: "mega_3",
        name: "Chicken Feast",
        image:
          "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop",
        originalPrice: 38,
        discountPrice: 12,
        hasDiscount: true,
        description: "8 pieces fried chicken with sides",
        category: "chicken",
      },
      {
        id: "mega_4",
        name: "Breakfast Special",
        image:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&h=200&fit=crop",
        originalPrice: 15,
        discountPrice: 6,
        hasDiscount: true,

        description: "8 pieces fried chicken with sides",
        category: "chicken",
      },
      {
        id: "mega_4",
        name: "Breakfast Special",
        image:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&h=200&fit=crop",
        originalPrice: 45000,
        discountPrice: 9000,
        hasDiscount: true,
        description: "Eggs, bacon, pancakes and coffee",
        category: "breakfast",
      },
    ],
  },
  {
    id: "7",
    name: "Nonstop Noodles",
    type: "Asian • 24/7 Service",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 145,
    distance: "1.8km",
    deliveryTime: "12-18 min",
    deliveryFee: "S/ 4",
    promo: false,
    freeDelivery: true,
    price: 25000,
    description: "Noodles anytime, anywhere",
    address: "Jl. Senayan No. 234, Jakarta",
    variants: 18,
    priceRange: "S/ 18-65",
    hours: "24/7", // 24 HORAS // 🔥 NUEVAS PROPIEDADES
    isWeeklyDeal: false,
    isDailyDeal: false,
    isTrending: true,
    isClientFavorite: true,
    category: "postres",
    discounts: [
      {
        id: "1",
        title: "Late Night 30%",
        description: "After 10PM discount",
        type: "discount",
        color: "#FF4444",
      },
    ],
    popularDishes: [
      {
        id: "nonstop_1",
        name: "Midnight Mie Ayam",
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop",
        originalPrice: 32000,
        discountPrice: 22000,
        hasDiscount: true,
        description: "Traditional chicken noodle soup",
        category: "noodles",
        isTrending: true,
      },
      {
        id: "nonstop_2",
        name: "Spicy Laksa",
        image:
          "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=200&h=200&fit=crop",
        originalPrice: 38000,
        discountPrice: 27000,
        hasDiscount: true,
        description: "Coconut curry noodle soup",
        category: "noodles",
        isClientFavorite: true,
      },
      {
        id: "nonstop_3",
        name: "Beef Pho",
        image:
          "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop",
        originalPrice: 42000,
        discountPrice: 29000,
        hasDiscount: true,
        description: "Vietnamese beef noodle soup",
        category: "pho",
      },
      {
        id: "nonstop_4",
        name: "Wonton Noodles",
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop",
        originalPrice: 35000,
        discountPrice: 25000,
        hasDiscount: true,
        description: "Egg noodles with pork wontons",
        category: "noodles",
      },
    ],
  },
  {
    id: "8",
    name: "Rocket Delivery",
    type: "International • Ultra Fast",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 312,
    distance: "0.7km",
    deliveryTime: "5-10 min", // SÚPER RÁPIDO
    deliveryFee: "S/ 1",
    promo: true,
    freeDelivery: true,
    price: 35000,
    description: "Fastest delivery in the city",
    address: "Jl. Menteng No. 456, Jakarta",
    variants: 22,
    priceRange: "S/ 25-90",
    hours: "24/7", // 24 HORAS // 🔥 NUEVAS PROPIEDADES
    isWeeklyDeal: true,
    isDailyDeal: true,
    isTrending: true,
    isClientFavorite: true,
    category: "postres",
    discounts: [
      {
        id: "1",
        title: "Rocket Speed 50%",
        description: "Super fast, super cheap",
        type: "discount",
        color: "#FF4444",
      },
    ],
    popularDishes: [
      {
        id: "rocket_1",
        name: "Rocket Burger",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
        originalPrice: 50000,
        discountPrice: 25000,
        hasDiscount: true,
        description: "Delivered in rocket speed",
        category: "burger",
        isWeeklyDeal: true,
        isDailyDeal: true,
        isTrending: true,
        isClientFavorite: true,
      },
      {
        id: "rocket_2",
        name: "Lightning Pasta",
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=200&h=200&fit=crop",
        originalPrice: 55000,
        discountPrice: 28000,
        hasDiscount: true,
        description: "Creamy carbonara pasta",
        category: "pasta",
        isTrending: true,
      },
      {
        id: "rocket_3",
        name: "Speed Salad",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
        originalPrice: 40000,
        discountPrice: 20000,
        hasDiscount: true,
        description: "Fresh mixed greens with protein",
        category: "salad",
        isClientFavorite: true,
      },
      {
        id: "rocket_4",
        name: "Express Tacos",
        image:
          "https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=200&h=200&fit=crop",
        originalPrice: 45000,
        discountPrice: 23000,
        hasDiscount: true,
        description: "3 soft tacos with guacamole",
        category: "mexican",
      },
    ],
  },
];

// 🔥 FUNCIONES ACTUALIZADAS CON NUEVOS FILTROS
export const getAllDishesWithRestaurant = () => {
  console.log("🔍 getAllDishesWithRestaurant called");
  console.log("📊 Total restaurants:", restaurants.length);

  const allDishes = [];

  restaurants.forEach((restaurant, index) => {
    console.log(`🏪 Processing restaurant ${index + 1}:`, restaurant.name);
    console.log("📋 Popular dishes:", restaurant.popularDishes?.length || 0);

    if (restaurant.popularDishes && restaurant.popularDishes.length > 0) {
      restaurant.popularDishes.forEach((dish, dishIndex) => {
        console.log(`  🍽️ Adding dish ${dishIndex + 1}:`, dish.name);

        allDishes.push({
          ...dish,
          restaurant: {
            id: restaurant.id,
            name: restaurant.name,
            type: restaurant.type,
            image: restaurant.image,
            rating: restaurant.rating,
            distance: restaurant.distance,
            deliveryTime: restaurant.deliveryTime,
            deliveryFee: restaurant.deliveryFee,
            freeDelivery: restaurant.freeDelivery, // 🔥 AGREGAR PROPIEDADES DEL RESTAURANTE
            isWeeklyDeal: restaurant.isWeeklyDeal,
            isDailyDeal: restaurant.isDailyDeal,
            isTrending: restaurant.isTrending,
            isClientFavorite: restaurant.isClientFavorite,
            category: restaurant.category,
          },
          uniqueId: `${restaurant.id}_${dish.id}`,
        });
      });
    }
  });

  console.log("✅ Total dishes extracted:", allDishes.length);
  return allDishes;
};

export const getFilteredDishes = (filterType) => {
  console.log("🔍 getFilteredDishes called with filterType:", filterType);

  const allDishes = getAllDishesWithRestaurant();
  console.log("📊 All dishes before filtering:", allDishes.length);

  let filteredDishes = [];

  switch (filterType) {
    case "popular":
      filteredDishes = allDishes;
      break;

    case "descuento":
      filteredDishes = allDishes.filter((dish) => dish.hasDiscount);
      break;

    case "todoElDia": // Restaurantes que están abiertos 24/7
      filteredDishes = allDishes.filter(
        (dish) =>
          dish.restaurant.name.includes("24") ||
          restaurants.find((r) => r.id === dish.restaurant.id)?.hours === "24/7"
      );
      break;

    case "entregaRapida": // Platos de restaurantes con entrega rápida (menos de 15 min)
      filteredDishes = allDishes.filter((dish) => {
        const deliveryTime = dish.restaurant.deliveryTime;
        const minutes = Number.parseInt(deliveryTime.split("-")[0]);
        return minutes <= 15;
      });
      break; // 🔥 NUEVOS FILTROS PARA WEEKLY DEALS

    case "ofertasDelDia":
      filteredDishes = allDishes.filter(
        (dish) => dish.isDailyDeal || dish.restaurant.isDailyDeal
      );
      break;

    case "ofertasSemanales":
      filteredDishes = allDishes.filter(
        (dish) => dish.isWeeklyDeal || dish.restaurant.isWeeklyDeal
      );
      break;

    case "favoritosSemana":
      filteredDishes = allDishes.filter(
        (dish) => dish.isClientFavorite || dish.restaurant.isClientFavorite
      );
      break;

    case "tendencias":
      filteredDishes = allDishes.filter(
        (dish) => dish.isTrending || dish.restaurant.isTrending
      );
      break;

    case "soloTi": // Ofertas personalizadas - combinamos varios criterios
      filteredDishes = allDishes.filter(
        (dish) => dish.hasDiscount && (dish.isTrending || dish.isClientFavorite)
      );
      break; // 🔥 NUEVOS FILTROS PARA DAILY DISHES

    case "favoritosCliente":
      filteredDishes = allDishes.filter(
        (dish) => dish.isClientFavorite || dish.restaurant.isClientFavorite
      );
      break;

    case "bebidas":
      filteredDishes = allDishes.filter(
        (dish) => dish.restaurant.category === "bebidas"
      );
      break;

    case "comidaRapida":
      filteredDishes = allDishes.filter(
        (dish) => dish.restaurant.category === "comidaRapida"
      );
      break;

    case "postres":
      filteredDishes = allDishes.filter(
        (dish) => dish.restaurant.category === "postres"
      );
      break;

    default:
      filteredDishes = allDishes;
  }

  console.log("✅ Filtered dishes:", filteredDishes.length);
  return filteredDishes;
};

export const getNearbyRestaurants = (maxDistance = 5) => {
  console.log("🔍 getNearbyRestaurants called with maxDistance:", maxDistance);

  const nearbyRestaurants = restaurants.filter((restaurant) => {
    const distance = Number.parseFloat(restaurant.distance.replace("km", ""));
    return distance <= maxDistance;
  });

  console.log("✅ Nearby restaurants:", nearbyRestaurants.length);
  return nearbyRestaurants;
};

// 🔥 NUEVA FUNCIÓN PARA OBTENER ESTADÍSTICAS DE CATEGORÍAS
export const getCategoryStats = () => {
  const allDishes = getAllDishesWithRestaurant();

  const stats = {
    favoritosCliente: allDishes.filter(
      (dish) => dish.isClientFavorite || dish.restaurant.isClientFavorite
    ).length,
    bebidas: allDishes.filter((dish) => dish.restaurant.category === "bebidas")
      .length,
    comidaRapida: allDishes.filter(
      (dish) => dish.restaurant.category === "comidaRapida"
    ).length,
    postres: allDishes.filter((dish) => dish.restaurant.category === "postres")
      .length,
  };

  return stats;
};
