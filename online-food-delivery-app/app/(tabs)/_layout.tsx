import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons"; // <--- ¡Añade esta línea!
import Feather from "@expo/vector-icons/Feather";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#E94864" }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null, // 👈 Oculta este tab de la barra
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false, // 👈 OCULTA EL HEADER
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ color }) => (
            <Feather name="clipboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="comments" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile ",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
