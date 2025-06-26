// navigation/RootStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabLayout from './TabLayout';
import DetailRestoran from '../screens/DetailRestoran';
import NearMeScreen from '../screens/NearMeScreen';
import PopularScreen from '../screens/PopularScreen';
import DiscountScreen from '../screens/DiscountScreen';
import AllDayScreen from '../screens/AllDayScreen';
import QuickDeliveryScreen from '../screens/QuickDeliveryScreen';
import LoginScreen from '../screens/LoginScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductListScreen from '../screens/ProductListScreen';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="MainTabs">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'Iniciar sesión' }}
            />
            <Stack.Screen
                name="MainTabs"
                component={TabLayout}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetailRestoran"
                component={DetailRestoran}
                options={{ title: 'Restaurant Detail' }}
            />
            <Stack.Screen
                name="NearMeScreen"
                component={NearMeScreen}
                options={{ title: 'Near Me' }}
            />
            <Stack.Screen
                name="PopularScreen"
                component={PopularScreen}
                options={{ title: 'Popular' }}
            />
            <Stack.Screen
                name="DiscountScreen"
                component={DiscountScreen}
                options={{ title: 'Discount' }}
            />
            <Stack.Screen
                name="AllDayScreen"
                component={AllDayScreen}
                options={{ title: '24 Hours' }}
            />
            <Stack.Screen
                name="QuickDeliveryScreen"
                component={QuickDeliveryScreen}
                options={{ title: 'Quick Delivery' }}
            />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{ title: 'Productos disponibles' }}
            />
        </Stack.Navigator>
    );
};

export default RootStack;