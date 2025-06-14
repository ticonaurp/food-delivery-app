// screens/ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const friends = ['Juan', 'Maria', 'Pedro', 'Ana'];
const deliveries = ['Express', 'RapidDelivery', 'FastCargo', 'SuperDelivery'];
const restaurants = ['Pizza Place', 'Sushi Bar', 'Burger King', 'Taco Shop'];

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState('delivery');
  const [showAddScreen, setShowAddScreen] = useState(null);

  useEffect(() => {
    switch (activeChat) {
      case 'delivery':
        setMessages([
          { id: '1', sender: 'Express', text: 'Tu pedido está en proceso.', timestamp: '10:00 AM' },
        ]);
        break;
      case 'friends':
        setMessages([
          { id: '1', sender: 'Juan', text: '¿Cómo va todo?', timestamp: '9:00 AM' },
        ]);
        break;
      case 'restaurant':
        setMessages([
          { id: '1', sender: 'Pizza Place', text: 'Tu pedido ha sido confirmado.', timestamp: '10:00 AM' },
        ]);
        break;
    }
  }, [activeChat]);

  const sendMessage = (sender, text) => {
    setMessages(prev => [
      ...prev,
      {
        id: `${prev.length + 1}`,
        sender,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage('Me', newMessage);
      setNewMessage('');
    }
  };

  const handleAdd = (type, name) => {
    if (activeChat === type) {
      sendMessage('Me', `Nuevo ${type === 'friends' ? 'amigo' : type === 'delivery' ? 'delivery' : 'restaurante'} añadido: ${name}`);
      sendMessage(name, '¡Hola! Estoy aquí para ayudarte.');
      setShowAddScreen(null);
    } else {
      sendMessage('Sistema', `Debes estar en la sección de ${type} para añadir uno.`);
    }
  };

  const renderAddScreen = () => {
    const dataMap = {
      friend: { list: friends, type: 'friends' },
      delivery: { list: deliveries, type: 'delivery' },
      restaurant: { list: restaurants, type: 'restaurant' }
    };

    if (!showAddScreen) return null;
    const { list, type } = dataMap[showAddScreen];

    return (
      <View style={styles.addScreen}>
        <Text style={styles.addHeader}>Selecciona {showAddScreen}</Text>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleAdd(type, item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'Me';
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.sender}>{item.sender}:</Text>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="comments" size={24} color="#fff" />
        <Text style={styles.headerText}>Chat</Text>
      </View>

      <FlatList
        style={styles.chatList}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe tu mensaje..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <FontAwesome name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.chatSelector}>
        <TouchableOpacity onPress={() => setActiveChat('delivery')}>
          <FontAwesome name="truck" size={24} color={activeChat === 'delivery' ? '#FF6F61' : '#aaa'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveChat('friends')}>
          <FontAwesome name="users" size={24} color={activeChat === 'friends' ? '#FF6F61' : '#aaa'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveChat('restaurant')}>
          <FontAwesome name="cutlery" size={24} color={activeChat === 'restaurant' ? '#FF6F61' : '#aaa'} />
        </TouchableOpacity>
      </View>

      <View style={styles.addSection}>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddScreen('friend')}>
          <FontAwesome name="user-plus" size={18} color="#fff" />
          <Text style={styles.addText}>Añadir Amigo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddScreen('delivery')}>
          <FontAwesome name="plus" size={18} color="#fff" />
          <Text style={styles.addText}>Añadir Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddScreen('restaurant')}>
          <FontAwesome name="plus" size={18} color="#fff" />
          <Text style={styles.addText}>Añadir Restaurante</Text>
        </TouchableOpacity>
      </View>

      {renderAddScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', padding: 10,
  },
  header: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF6F61',
    padding: 15, borderRadius: 10, marginBottom: 10,
  },
  headerText: {
    fontSize: 22, fontWeight: 'bold', color: '#fff', marginLeft: 10,
  },
  chatList: {
    flex: 1, marginBottom: 10,
  },
  messageContainer: {
    marginVertical: 5, padding: 10, borderRadius: 10, maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end', backgroundColor: '#D1FADF',
  },
  otherMessage: {
    alignSelf: 'flex-start', backgroundColor: '#F0F0F0',
  },
  sender: {
    fontWeight: 'bold', marginBottom: 2,
  },
  text: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10, color: '#555', marginTop: 5, alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', marginTop: 5,
  },
  input: {
    flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 20, padding: 10,
  },
  sendButton: {
    backgroundColor: '#FF6F61', padding: 10, borderRadius: 20, marginLeft: 10,
  },
  chatSelector: {
    flexDirection: 'row', justifyContent: 'space-around', marginTop: 10,
  },
  addSection: {
    flexDirection: 'row', justifyContent: 'space-around', marginTop: 15,
  },
  addButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF6F61',
    padding: 10, borderRadius: 10,
  },
  addText: {
    color: '#fff', marginLeft: 5, fontWeight: 'bold',
  },
  addScreen: {
    backgroundColor: '#eee', padding: 10, marginTop: 10, borderRadius: 10,
  },
  addHeader: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 5,
  },
});
