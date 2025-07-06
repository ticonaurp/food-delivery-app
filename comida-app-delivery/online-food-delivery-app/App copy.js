import "react-native-gesture-handler"
import "react-native-reanimated"
import "react-native-get-random-values"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, Platform, Text, View } from "react-native"
import RootStack from "./navigation/RootStack"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import NoModalWrapper from "./components/NoModalWrapper"
import { LogBox } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useAppStateHandler } from "./hooks/useAppStateHandler"
import * as Sentry from "@sentry/react-native"
import { useEffect, useState } from "react"

// ✅ Inicializar Sentry
Sentry.init({
  dsn: "https://9280067e9677d30ef330a8d58c568d42@o4509617237917696.ingest.us.sentry.io/4509617261903872",
  enableInExpoDevelopment: true,
  debug: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ["localhost", /^\//],
    }),
  ],
})

// ⚠️ Ignorar warnings innecesarios
LogBox.ignoreLogs([
  "Warning: componentWillReceiveProps",
  "Warning: componentWillMount",
  "Require cycle:",
  "Remote debugger",
  "Setting a timer",
  "Animated.event now requires",
  "VirtualizedLists should never be nested",
])

function AppContent() {
  const [errorMessage, setErrorMessage] = useState("")

  useAppStateHandler(
    () => {
      console.log("🔄 Reseteando UI después de regresar")
      if (Platform.OS === "android") {
        StatusBar.setBarStyle("light-content", true)
        StatusBar.setBackgroundColor("transparent", true)
        StatusBar.setTranslucent(true)
        StatusBar.setHidden(false)
      }
    },
    () => {
      console.log("📱 App en background")
    }
  )

  useEffect(() => {
    // ✅ Enviamos error de prueba a Sentry
    const simulateError = () => {
      try {
        throw new Error("💥 Error de prueba enviado a Sentry")
      } catch (err) {
        Sentry.captureException(err)
        setErrorMessage("Ocurrió un error de prueba: 💥 revisa Sentry")
      }
    }

    simulateError()
  }, [])

  return (
    <Sentry.TouchEventBoundary fallback={<></>}>
      <SafeAreaProvider>
        <NoModalWrapper>
          <AuthProvider>
            <CartProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                  <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} hidden={false} />
                  <NavigationContainer>
                    <RootStack />
                  </NavigationContainer>
                  {/* Mensaje de error de prueba en pantalla */}
                  {errorMessage !== "" && (
                    <View style={{ padding: 16, backgroundColor: "#fff", position: "absolute", bottom: 0, width: "100%" }}>
                      <Text style={{ color: "red", textAlign: "center" }}>{errorMessage}</Text>
                    </View>
                  )}
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </CartProvider>
          </AuthProvider>
        </NoModalWrapper>
      </SafeAreaProvider>
    </Sentry.TouchEventBoundary>
  )
}

export default function App() {
  return <AppContent />
}
