import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth0Provider } from '@auth0/auth0-react';

// Pantallas
import ProfileScreen from './screens/ProfileScreen'; // Asegúrate de que la ruta sea correcta
import OrderScreen from './screens/OrderScreen'; 
import PaymentMethods from './screens/PaymentMethods'; 
import EditProfile from './screens/EditProfile'; 
import Promotions from './screens/Promotions'; 
import Friends from './screens/Friends'; 
import Settings from './screens/Settings'; 
import { FontAwesome } from '@expo/vector-icons';

<TouchableOpacity style={styles.button}>
  <FontAwesome name="edit" size={24} color="#fff" />
  <Text style={styles.buttonText}>Edit Profile</Text>
</TouchableOpacity>

// Configuración de Auth0
const domain = "dev-mv6m567ackmmew0y.us.auth0.com";
const clientId = "6g0V8OW4rttF2TEdrTyFI7vYlcZNaKIs";

const Stack = createStackNavigator();

const Root = () => (
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProfileScreen">
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Promotions" component={Promotions} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  </Auth0Provider>
);

export default Root;