import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import NearMeScreen from "./screens/NearMeScreen";
import PopularScreen from "./screens/PopularScreen";
import DiscountScreen from "./screens/DiscountScreen";
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Oculta el encabezado predeterminado
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Near Me" component={NearMeScreen} />
        <Drawer.Screen name="Popular" component={PopularScreen} />
        <Drawer.Screen name="Discounts" component={DiscountScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
