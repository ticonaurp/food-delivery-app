import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { restaurants } from '../data/restaurants.js';

const firebaseConfig = {
  apiKey: "AIzaSyBkKHooC7L5oHPSJUEjCFO0nswTHzhIp60",
  authDomain: "onlinedeliveryapp-19236.firebaseapp.com",
  projectId: "onlinedeliveryapp-19236",
  storageBucket: "onlinedeliveryapp-19236.appspot.com",
  messagingSenderId: "314147140443",
  appId: "1:314147140443:web:a1ecbe9f3879bdf091607e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cleanImage = (img) => (img?.uri ? img.uri : img);

const subirRestaurantesYPlatos = async () => {
  for (const restaurante of restaurants) {
    try {
      // 1. Subir restaurante
      const restauranteData = {
        nombre: restaurante.name,
        pais: "Perú",
        descripcion: restaurante.description,
        imagen: cleanImage(restaurante.imageUrl),
        rating: restaurante.rating,
        reviews: restaurante.reviews,
        deliveryTime: restaurante.deliveryTime,
        promo: restaurante.promo
          ? {
              texto: restaurante.promo,
              activo: true,
              dias: ["lunes", "martes", "viernes"],
              tipo: "combo",
              condiciones: "Válido solo en local"
            }
          : null,
        freeDelivery: restaurante.freeDelivery || false,
        price: restaurante.price,
        distance: restaurante.distance,
      };

      const docRef = await addDoc(collection(db, "restaurants"), restauranteData);
      console.log(`✅ Restaurante subido: ${restaurante.name}`);

      const restaurantId = docRef.id;

      // 2. Subir platos
      for (const [categoria, items] of Object.entries(restaurante.menu)) {
        for (const item of items) {
          const platoData = {
            nombre: item.name,
            descripcion: "Sin descripción aún",
            precio: item.price,
            imagen: cleanImage(item.image),
            categoria,
            pais: "Perú",
            restaurantId,
            restaurantName: restaurante.name,
            popular: categoria === "Popular",
            descuento: !!restaurante.promo,
            entregaRapida: restaurante.deliveryTime.includes("15"),
            todoElDia: true
          };

          await addDoc(collection(db, "platos"), platoData);
          console.log(`🍽️ Plato agregado: ${item.name} de ${restaurante.name}`);
        }
      }

    } catch (err) {
      console.error(`❌ Error al subir restaurante ${restaurante.name}:`, err);
    }
  }
};

subirRestaurantesYPlatos();
