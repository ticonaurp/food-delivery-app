import "react-native-gesture-handler"
import "react-native-reanimated"
import "react-native-get-random-values"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"
import RootStack from "./navigation/RootStack"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { FavoritesProvider } from "./context/FavoritesContext" // ✅ NUEVO
import NoModalWrapper from "./components/NoModalWrapper"
import { LogBox } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

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

export default function App() {
  return (
    <SafeAreaProvider>
      <NoModalWrapper>
        <AuthProvider>
          <FavoritesProvider>
            {" "}
            {/* ✅ NUEVO PROVIDER */}
            <CartProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                  <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} hidden={false} />
                  <NavigationContainer>
                    <RootStack />
                  </NavigationContainer>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </NoModalWrapper>
    </SafeAreaProvider>
  )
}
