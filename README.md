# Online Food Delivery App

Aplicación móvil de delivery desarrollada con React Native, que brinda una experiencia moderna para realizar pedidos de comida online. Cuenta con integración a Firebase y Auth0 para autenticación segura, carrito de compras inteligente, historial de pedidos, seguimiento en tiempo real y un sistema de monedero virtual con coins.

---

## Características principales

- Registro e inicio de sesión seguro con Firebase y Auth0
- Exploración de restaurantes y menús filtrados por tipo o popularidad
- Carrito de compras agrupado por restaurante
- Favoritos, búsquedas recientes y platos populares
- Historial de pedidos con detalle completo
- Seguimiento del estado del pedido en tiempo real
- Monedero virtual con sistema de carga y descuento mediante coins
- Pantalla de confirmación post-compra con opción de rastreo
- Interfaz moderna con animaciones fluidas
- Precios adaptados a soles peruanos (PEN)

---

## Tecnologías utilizadas

| Herramienta           | Uso                                        |
|-----------------------|--------------------------------------------|
| React Native          | Desarrollo móvil multiplataforma           |
| React Navigation      | Navegación entre pantallas                 |
| Firebase (Auth & DB)  | Autenticación y almacenamiento de datos    |
| Auth0                 | Login con proveedor externo                |
| Context API           | Manejo de estados globales                 |
| Expo                  | Desarrollo y despliegue rápido             |
| Reanimated/Animatable | Animaciones y efectos visuales             |
| Formato de moneda     | Adaptación local con soles peruanos (S/.)  |

---

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/online-food-delivery-app.git
cd online-food-delivery-app
Instala las dependencias:

bash
Copiar
Editar
npm install
# o
yarn install
Inicia el proyecto con Expo:

bash
Copiar
Editar
npx expo start
Estructura del proyecto
bash
Copiar
Editar
/screens
│   HomeScreen.js
│   SearchScreen.js
│   RestaurantDetailScreen.js
│   CartScreen.js
│   SuccessScreen.js
│   OrderTrackingScreen.js
│   ProfileScreen.js
│   RegisterScreen.js
│   LoginScreen.js
/context        // Contextos globales
/components     // Componentes reutilizables
/data           // Datasets y mockups
/utils          // Funciones utilitarias
Funcionalidades futuras
Integración con Google Maps para ubicación de dirección

Múltiples direcciones de entrega por usuario

Soporte para notificaciones push

Panel de estadísticas

Generación automática de boletas o facturas

Capturas de pantalla
Sustituye las imágenes con tus propias capturas reales

Inicio	Carrito	Pedido confirmado

Enlaces
Proyecto en Expo: https://expo.dev/@tu-usuario/online-food-delivery-app

Google Play (próximamente)

Autores
Mathias Hernan Ticona Alvarez — Desarrollador principal



Licencia
Este proyecto está bajo la licencia MIT. Libre para uso educativo y personal.