import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const paymentOptions = [
  {
    id: 'yape',
    label: 'Yape',
    icon: 'https://seeklogo.com/images/Y/yape-logo-5E37E1D290-seeklogo.com.png',
  },
  {
    id: 'plin',
    label: 'Plin',
    icon: 'https://play-lh.googleusercontent.com/jP7Yhz-6Xxj5vvOUmQ5L0SaRVL6aEd_Gvnr_biDEbH9cHqO4aAjNdHZmUg7QkD5gFQ=w240-h480-rw',
  },
  {
    id: 'card',
    label: 'Tarjeta de crédito/débito',
    icon: 'https://cdn-icons-png.flaticon.com/512/633/633611.png',
  },
  {
    id: 'cash',
    label: 'Pago contra entrega',
    icon: 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
  },
];

export default function PaymentOptionsScreen() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });
  const [stage, setStage] = useState('selection'); // 'selection' | 'processing' | 'receipt'

  const navigation = useNavigation();
  const { clearCart } = useCart();

  const validateCardData = () => {
    return cardData.number && cardData.expiry && cardData.cvv;
  };

  const handleConfirm = () => {
    if (selectedMethod.id === 'card' && !validateCardData()) {
      Alert.alert('Datos incompletos', 'Por favor completa todos los campos de la tarjeta.');
      return;
    }

    // Mostrar pantalla de procesamiento
    setStage('processing');

    // Simular espera y luego mostrar recibo
    setTimeout(() => {
      clearCart();
      setStage('receipt');
    }, 2500);
  };

  const renderProcessing = () => (
    <View style={styles.centeredContent}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5978/5978530.png' }}
        style={styles.processingImage}
      />
      <Text style={styles.receiptTitle}>Procesando pedido...</Text>
      <Text style={styles.instructionText}>
        Espera un momento mientras preparamos tu pedido.
      </Text>
    </View>
  );

  const renderReceipt = () => (
    <View style={styles.centeredContent}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png' }}
        style={styles.receiptImage}
      />
      <Text style={styles.receiptTitle}>¡Pago exitoso!</Text>
      <Text style={styles.instructionText}>
        Tu pedido ha sido confirmado con {selectedMethod.label}.
      </Text>
      <Text style={styles.deliveryText}>Relájate, tu comida llegará en 25 minutos.</Text>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.confirmText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPaymentContent = () => {
    if (!selectedMethod) return null;

    switch (selectedMethod.id) {
      case 'yape':
      case 'plin':
        return (
          <View style={styles.centeredContent}>
            <Image
              source={{ uri: 'https://i.imgur.com/uU3RZL0.png' }}
              style={styles.qrImage}
            />
            <Text style={styles.instructionText}>
              Escanea este código para pagar con {selectedMethod.label}.
            </Text>
          </View>
        );
      case 'card':
        return (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Número de tarjeta"
              style={styles.input}
              keyboardType="numeric"
              value={cardData.number}
              onChangeText={(text) => setCardData({ ...cardData, number: text })}
            />
            <TextInput
              placeholder="Fecha de vencimiento (MM/AA)"
              style={styles.input}
              value={cardData.expiry}
              onChangeText={(text) => setCardData({ ...cardData, expiry: text })}
            />
            <TextInput
              placeholder="CVV"
              style={styles.input}
              secureTextEntry
              keyboardType="numeric"
              value={cardData.cvv}
              onChangeText={(text) => setCardData({ ...cardData, cvv: text })}
            />
          </View>
        );
      case 'cash':
        return (
          <View style={styles.centeredContent}>
            <Text style={styles.instructionText}>
              Pagarás en efectivo al momento de recibir tu pedido. 🛵💵
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {stage === 'processing' && renderProcessing()}
      {stage === 'receipt' && renderReceipt()}
      {stage === 'selection' && !selectedMethod && (
        <>
          <Text style={styles.title}>Selecciona tu método de pago</Text>
          {paymentOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => setSelectedMethod(option)}
            >
              <Image source={{ uri: option.icon }} style={styles.icon} />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
      {stage === 'selection' && selectedMethod && (
        <>
          <Text style={styles.title}>Pago con {selectedMethod.label}</Text>
          {renderPaymentContent()}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirmar pago</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedMethod(null)}>
            <Text style={styles.backText}>← Cambiar método</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 16,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  centeredContent: {
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 16,
  },
  instructionText: {
    fontSize: 16,
    color: '#444',
    marginTop: 12,
    textAlign: 'center',
  },
  deliveryText: {
    fontSize: 15,
    color: '#666',
    marginTop: 6,
    textAlign: 'center',
  },
  qrImage: {
    width: 180,
    height: 180,
    borderRadius: 12,
  },
  receiptImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  processingImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#F4F4F4',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: '#FF4D6D',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  backText: {
    color: '#888',
    fontSize: 16,
  },
});
