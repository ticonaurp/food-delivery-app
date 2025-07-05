export default {
  expo: {
    name: "Restaurant App",
    slug: "restaurant-app",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.restaurantapp",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#FFFFFF",
      },
      package: "com.yourcompany.restaurantapp",
    },
    web: {},
    extra: {

        apiKey: "AIzaSyBkKHooC7L5oHPSJUEjCFO0nswTHzhIp60",
  authDomain: "onlinedeliveryapp-19236.firebaseapp.com",
  projectId: "onlinedeliveryapp-19236",
  storageBucket: "onlinedeliveryapp-19236.appspot.com",
  messagingSenderId: "314147140443",
  appId: "1:314147140443:web:a1ecbe9f3879bdf091607e",

      auth0Domain: "dev-ix8deo5de8ryya1n.us.auth0.com",
      auth0ClientId: "U3WOrnybeZnBNvu4PrZSudWuHjkTMvai",
    },
  },
}
