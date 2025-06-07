import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Usamos FontAwesome para los iconos

function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header con la foto del usuario */}
      <View style={styles.header}>
        <Image 
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEY21qcAFAMli4-I8OVcd9C-BmszpY1MqnA&s'}} 
          style={styles.userImage}
        />
        <Text style={styles.headerText}>Geraldin Nuñez</Text>
      </View>

      {/* Información de perfil */}
      <View style={styles.profileInfo}>
        <Text style={styles.title}>Telefono: 947169852</Text>
        <Text style={styles.title}>Dirección: 2113 , Lima</Text>
      </View>

      {/* Iconos de características */}
      <View style={styles.iconContainer}>
        <FontAwesome name="map-marker" size={30} color="#ff6347" style={styles.icon} />
        <FontAwesome name="star" size={30} color="#ff6347" style={styles.icon} />
        <FontAwesome name="percentage" size={30} color="#ff6347" style={styles.icon} />
        <FontAwesome name="refresh" size={30} color="#ff6347" style={styles.icon} />
        <FontAwesome name="truck" size={30} color="#ff6347" style={styles.icon} />
      </View>

      {/* Acciones del Usuario */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderScreen')}>
          <Text style={styles.buttonText}>Mis Ordenes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentMethods')}>
          <Text style={styles.buttonText}>Métodos de Pagos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Promotions')}>
          <Text style={styles.buttonText}>Promociones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Friends')}>
          <Text style={styles.buttonText}>Amigos</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Ajustes */}
      <View style={styles.settings}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ff6347',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
  actions: {
    padding: 20,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  settings: {
    padding: 20,
    alignItems: 'center',
  },
});

export default ProfileScreen;
