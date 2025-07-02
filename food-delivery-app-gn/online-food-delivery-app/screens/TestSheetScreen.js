// TestSheetScreen.js
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function TestSheetScreen() {
  const sheetRef = useRef(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('🧪 present modal:', sheetRef.current);
          sheetRef.current?.present();
        }}
      >
        <Text style={styles.buttonText}>Abrir BottomSheetModal</Text>
      </TouchableOpacity>

      <BottomSheetModal
        ref={sheetRef}
        index={0}
        snapPoints={['50%']}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: '#888', width: 30 }}
        backgroundStyle={{ backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      >
        <View style={styles.sheetContent}>
          <Text>👍 Este es el BottomSheetModal</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  button: { backgroundColor: '#f43f5e', padding: 12, borderRadius: 6, marginBottom: 16 },
  buttonText: { color: '#fff', fontWeight: '600' },
  sheetContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
