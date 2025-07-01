import React, { useRef, useMemo } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function TestBottomSheet() {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%'], []);

  const openModal = () => {
    console.log('📣 Intentando abrir modal');
    bottomSheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <Button title="Abrir modal" onPress={openModal} />
      <BottomSheetModal ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={styles.content}>
          <Text style={styles.title}>Elige tu dirección</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
