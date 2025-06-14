import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Usamos FontAwesome para los iconos
import { launchImageLibrary } from 'react-native-image-picker'; // Importamos la librería para seleccionar imágenes

function ProfileScreen() {
  const navigation = useNavigation();

  // Estado para manejar la edición de campos
  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  // Estado para almacenar los nuevos valores
  const [name, setName] = useState("Geraldin Nuñez");
  const [phone, setPhone] = useState("947169852");
  const [address, setAddress] = useState("2113 , Lima");
  const [imageUri, setImageUri] = useState(null); // Estado para almacenar la imagen seleccionada

  // Función para manejar la edición de la imagen
  const handleImagePicker = () => {
    // Usamos `launchImageLibrary` para abrir el selector de imágenes
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      (response) => {
        if (response.didCancel) {
          console.log('Imagen seleccionada cancelada');
        } else if (response.errorCode) {
          console.log('Error al seleccionar la imagen: ', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri); // Guardamos la URI de la imagen seleccionada
        }
      }
    );
  };

  // Función para guardar los cambios
  const handleSave = () => {
    setEditingName(false);
    setEditingPhone(false);
    setEditingAddress(false);
    // Aquí puedes agregar lógica para guardar los cambios (en un backend o en un estado global)
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con la foto del usuario */}
      <View style={styles.header}>
        <Image 
          source={imageUri ? { uri: imageUri } : { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEY21qcAFAMli4-I8OVcd9C-BmszpY1MqnA&s'}} // Si hay una imagen seleccionada, la mostramos, sino mostramos la imagen por defecto
          style={styles.userImage}
        />
        <Text style={styles.headerText}>{name}</Text>
        {/* Botón para seleccionar la imagen */}
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
          <Text style={styles.buttonText}>Subir Imagen</Text>
        </TouchableOpacity>
      </View>

      {/* Información de perfil */}
      <View style={styles.profileInfo}>
        <View style={styles.editableField}>
          <Text style={styles.title}>Nombre:</Text>
          {editingName ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.fieldValue}>{name}</Text>
          )}
          <TouchableOpacity onPress={() => setEditingName(!editingName)}>
            <FontAwesome name="edit" size={20} color="#ff6347" />
          </TouchableOpacity>
        </View>

        <View style={styles.editableField}>
          <Text style={styles.title}>Teléfono:</Text>
          {editingPhone ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.fieldValue}>{phone}</Text>
          )}
          <TouchableOpacity onPress={() => setEditingPhone(!editingPhone)}>
            <FontAwesome name="edit" size={20} color="#ff6347" />
          </TouchableOpacity>
        </View>

        <View style={styles.editableField}>
          <Text style={styles.title}>Dirección:</Text>
          {editingAddress ? (
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
          ) : (
            <Text style={styles.fieldValue}>{address}</Text>
          )}
          <TouchableOpacity onPress={() => setEditingAddress(!editingAddress)}>
            <FontAwesome name="edit" size={20} color="#ff6347" />
          </TouchableOpacity>
        </View>
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

      {/* Botón para guardar cambios */}
      {(editingName || editingPhone || editingAddress) && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      )}
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
  imageButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
  editableField: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  fieldValue: {
    fontSize: 18,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
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
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 20,
  },
});

export default ProfileScreen;
