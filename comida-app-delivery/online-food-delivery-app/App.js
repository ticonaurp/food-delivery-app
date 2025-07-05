import "react-native-gesture-handler"
import "react-native-reanimated"
import "react-native-get-random-values"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, Platform } from "react-native"
import RootStack from "./navigation/RootStack"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import NoModalWrapper from "./components/NoModalWrapper"
import { LogBox } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useAppStateHandler } from "./hooks/useAppStateHandler"

// Ignorar warnings específicos
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
  // ✅ MANEJAR ESTADO DE LA APP CORRECTAMENTE
  useAppStateHandler(
    () => {
      // ✅ CUANDO REGRESA AL FOREGROUND
      console.log("🔄 Reseteando UI después de regresar")

      // ✅ RESETEAR STATUS BAR
      if (Platform.OS === "android") {
        StatusBar.setBarStyle("light-content", true)
        StatusBar.setBackgroundColor("transparent", true)
        StatusBar.setTranslucent(true)
        StatusBar.setHidden(false)
      }
    },
    () => {
      // Cuando va al background
      console.log("📱 App en background")
    },
  )

  return (
    <SafeAreaProvider>
      <NoModalWrapper>
        <AuthProvider>
          <CartProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                {/* ✅ STATUS BAR SIEMPRE TRANSPARENTE */}
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} hidden={false} />
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </CartProvider>
        </AuthProvider>
      </NoModalWrapper>
    </SafeAreaProvider>
  )
}

export default function App() {
  return <AppContent />
}
