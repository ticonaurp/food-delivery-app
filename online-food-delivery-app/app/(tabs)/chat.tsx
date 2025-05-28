import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function ChatScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chat Screen</Text>
      </View>
    </>
  );
}
