import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Lista de ejemplo para amigos, deliveries y restaurantes
const friends = ['Juan', 'Maria', 'Pedro', 'Ana'];
const deliveries = ['Express', 'RapidDelivery', 'FastCargo', 'SuperDelivery'];
const restaurants = ['Pizza Place', 'Sushi Bar', 'Burger King', 'Taco Shop'];

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState('delivery');  // 'delivery', 'friends', 'restaurant'
  const [showAddScreen, setShowAddScreen] = useState(null); // State to control which sub-screen to show

  useEffect(() => {
    if (activeChat === 'delivery') {
      setMessages([
        { id: '1', sender: 'Delivery', text: 'Tu pedido está en proceso.', timestamp: '10:00 AM' },
        { id: '2', sender: 'Me', text: '¡Gracias por la actualización!', timestamp: '10:05 AM' },
      ]);
    } else if (activeChat === 'friends') {
      setMessages([
        { id: '1', sender: 'Amigo', text: '¿Cómo va todo?', timestamp: '9:00 AM' },
        { id: '2', sender: 'Me', text: 'Todo bien, ¿y tú?', timestamp: '9:05 AM' },
      ]);
    } else if (activeChat === 'restaurant') {
      setMessages([
        { id: '1', sender: 'Restaurante', text: 'Tu pedido ha sido confirmado.', timestamp: '10:00 AM' },
        { id: '2', sender: 'Me', text: '¡Perfecto, gracias!', timestamp: '10:10 AM' },
      ]);
    }
  }, [activeChat]);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: `${messages.length + 1}`, sender: 'Me', text: newMessage, timestamp: new Date().toLocaleTimeString() },
      ]);
      setNewMessage('');
    }
  };

  const handleAddFriend = (name) => {
    if (activeChat === 'friends') {
      setMessages([
        ...messages,
        { id: `${messages.length + 1}`, sender: 'Me', text: `Amigo añadido: ${name}`, timestamp: new Date().toLocaleTimeString() },
      ]);
      setShowAddScreen(null); // Hide the add screen after adding
      setActiveChat('friends'); // Redirigir automáticamente a la sección de amigos
    } else {
      Alert.alert('¡Error!', 'Debes estar en la sección de Amigos para añadir un amigo.');
    }
  };

  const handleAddDelivery = (name) => {
    if (activeChat === 'delivery') {
      setMessages([
        ...messages,
        { id: `${messages.length + 1}`, sender: 'Me', text: `Delivery añadido: ${name}`, timestamp: new Date().toLocaleTimeString() },
      ]);
      setShowAddScreen(null); // Hide the add screen after adding
      setActiveChat('delivery'); // Redirigir automáticamente a la sección de delivery
    } else {
      Alert.alert('¡Error!', 'Debes estar en la sección de Delivery para añadir un delivery.');
    }
  };

  const handleAddRestaurant = (name) => {
    if (activeChat === 'restaurant') {
      setMessages([
        ...messages,
        { id: `${messages.length + 1}`, sender: 'Me', text: `Restaurante añadido: ${name}`, timestamp: new Date().toLocaleTimeString() },
      ]);
      setShowAddScreen(null); // Hide the add screen after adding
      setActiveChat('restaurant'); // Redirigir automáticamente a la sección de restaurante
    } else {
      Alert.alert('¡Error!', 'Debes estar en la sección de Restaurantes para añadir un restaurante.');
    }
  };

  const renderAddScreen = () => {
    if (showAddScreen === 'friend') {
      return (
        <View style={styles.addScreen}>
          <Text style={styles.addHeader}>Lista de Amigos</Text>
          <FlatList
            data={friends}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleAddFriend(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else if (showAddScreen === 'delivery') {
      return (
        <View style={styles.addScreen}>
          <Text style={styles.addHeader}>Lista de Deliveries</Text>
          <FlatList
            data={deliveries}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleAddDelivery(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else if (showAddScreen === 'restaurant') {
      return (
        <View style={styles.addScreen}>
          <Text style={styles.addHeader}>Lista de Restaurantes</Text>
          <FlatList
            data={restaurants}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleAddRestaurant(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="tag" size={24} color="#FF6F61" /> {/* Ícono de promociones */}
        <Text style={styles.headerText}>Chat</Text>
      </View>
      <View style={styles.chatList}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.message}>
              <Text style={styles.sender}>{item.sender}:</Text>
              <Text>{item.text}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe tu mensaje"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <FontAwesome name="paper-plane" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.chatSelector}>
        <TouchableOpacity onPress={() => setActiveChat('delivery')}>
          <FontAwesome name="truck" size={24} color={activeChat === 'delivery' ? '#007BFF' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveChat('friends')}>
          <FontAwesome name="users" size={24} color={activeChat === 'friends' ? '#007BFF' : '#555'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveChat('restaurant')}>
          <FontAwesome name="cutlery" size={24} color={activeChat === 'restaurant' ? '#007BFF' : '#555'} />
        </TouchableOpacity>
      </View>
      <View style={styles.addSection}>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddScreen('friend')}>
          <FontAwesome name="user-plus" size={24} color="#fff" />
          <Text style={styles.addText}>Añadir Amigo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddScreen('delivery')}>
          <FontAwesome name="truck" size={24} color="#fff" />
          <Text style={styles.addText}>Añadir Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddScreen('restaurant')}>
          <FontAwesome name="cutlery" size={24} color="#fff" />
          <Text style={styles.addText}>Añadir Restaurante</Text>
        </TouchableOpacity>
      </View>
      {renderAddScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  chatList: {
    flex: 1,
    marginVertical: 10,
  },
  message: {
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  chatSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  addSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6F61',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
  },
  addText: {
    color: '#fff',
    marginLeft: 10,
  },
  addScreen: {
    marginTop: 20,
    padding: 10,
  },
  addHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginVertical: 5,
    borderRadius: 5,
  },
});
