🛵 Online Food Delivery App
Una aplicación móvil desarrollada con React Native, orientada a ofrecer una experiencia fluida de pedido de comida online, integración con Firebase, autenticación con Auth0 y funcionalidades como carrito, historial, seguimiento en tiempo real y wallet virtual.

📱 Características principales
🔐 Registro e inicio de sesión con Firebase/Auth0

🍕 Explora restaurantes y menús filtrados por tipo

🛒 Carrito de compras inteligente, que agrupa por restaurante

🧾 Historial de pedidos con desglose detallado y totales

📍 Seguimiento del pedido con estados animados

❤️ Favoritos, búsquedas populares y recientes

👛 Monedero virtual y sistema de coins

📦 Pantalla de éxito post-pago con opciones de rastreo

🔄 Diseño fluido y animaciones con react-native-reanimated y react-native-animatable

🧱 Tecnologías utilizadas
⚛️ React Native

🧭 React Navigation

🔥 Firebase (Auth & Firestore)

🔐 Auth0

💾 Context API (Carrito, Usuario, Favoritos)

📦 Expo

💸 Formato de moneda en Soles Peruanos (PEN)

🎨 Estilos optimizados para UX mobile

🚀 Instalación
Clona este repositorio:

bash
Copiar
Editar
git clone https://github.com/tu-usuario/online-food-delivery-app.git
cd online-food-delivery-app
Instala dependencias:

bash
Copiar
Editar
npm install
# o si usas yarn
yarn install
Inicia el proyecto con Expo:

bash
Copiar
Editar
npx expo start
🧪 Estructura de carpetas
bash
Copiar
Editar
📁 /screens
  ├── LoginScreen.js
  ├── RegisterScreen.js
  ├── HomeScreen.js
  ├── RestaurantDetailScreen.js
  ├── CartScreen.js
  ├── SuccessScreen.js
  ├── OrderTrackingScreen.js
  ├── ProfileScreen.js
  └── ...
📁 /context
📁 /components
📁 /data
📁 /utils
📝 TODO / Próximas funcionalidades
🌎 Integración con mapas (Google Maps)

📍 Selección dinámica de dirección

🔔 Notificaciones push

📊 Estadísticas de pedidos

🧾 Facturación automática

🤝 Autores
Mathias Hernan Ticona Alvarez (Desarrollador principal)
gerald

📄 Licencia
Este proyecto está bajo la licencia MIT. Libre para uso educativo y personal.