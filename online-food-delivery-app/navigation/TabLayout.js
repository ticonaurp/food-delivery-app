// src/navigation/TabLayout.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen     from '../screens/HomeScreen';
import OrderScreen    from '../screens/OrderScreen';
import ChatScreen     from '../screens/ChatScreen';
import ProfileStack   from '../navigation/ProfileStack';
import NearMeScreen   from '../screens/NearMeScreen';
import Ionicons       from '@expo/vector-icons/Ionicons';
import FontAwesome    from '@expo/vector-icons/FontAwesome';
import Feather        from '@expo/vector-icons/Feather';
import { TouchableOpacity, StyleSheet } from 'react-native';
import YourCentralScreen from '../screens/YourCentralScreen';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#E94864" }}>
      <Tab.Screen
        name="Home"             
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="clipboard" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={YourCentralScreen}
        options={{
          tabBarButton: props => (
            <TouchableOpacity {...props} style={styles.addButton}>
              <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#E94864",
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    top: -20,
    borderColor: '#fff',
    borderWidth: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  }
});
