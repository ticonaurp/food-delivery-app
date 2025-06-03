import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  useEffect(() => {
    // Espera 100ms antes de redirigir, para evitar el error
    const timeout = setTimeout(() => {
      router.replace('/home');
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="blue" />
      <Text>Redirigiendo...</Text>
    </View>
  );
}
