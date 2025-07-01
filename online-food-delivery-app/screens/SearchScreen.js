import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig'; 

const db = getFirestore(app);

const trending = [
  { id: '1', name: 'Kfc' },
  { id: '2', name: 'Pizza' },
  { id: '3', name: 'Mcdonalds' },
];

const SearchScreen = () => {
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const buscarPlatos = async () => {
      if (queryText.trim().length < 2) {
        setResults([]);
        return;
      }

      try {
        const platosRef = collection(db, 'platos');
        const q = query(
          platosRef,
          where('nombre', '>=', queryText),
          where('nombre', '<=', queryText + '\uf8ff')
        );
        const snapshot = await getDocs(q);
        const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(datos);
      } catch (error) {
        console.error('❌ Error buscando:', error);
      }
    };

    buscarPlatos();
  }, [queryText]);

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </TouchableOpacity>
        <TextInput
          placeholder="Locales, platos y productos"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={queryText}
          onChangeText={setQueryText}
        />
      </View>

      {/* Banner */}
      <Image
        source={{
          uri: 'https://res.cloudinary.com/demo/image/upload/lays-artesanas.jpg',
        }}
        style={styles.banner}
        resizeMode="cover"
      />

      {results.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Resultados</Text>
          <FlatList
            data={results}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.trendItem}>
                <Text style={styles.trendName}>{item.nombre}</Text>
                <Text style={styles.trendSub}>S/ {item.precio}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Búsquedas que son tendencia</Text>
          <FlatList
            data={trending}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.trendItem}>
                <Text style={styles.rank}>#{index + 1}</Text>
                <View>
                  <Text style={styles.trendName}>{item.name}</Text>
                  <Text style={styles.trendSub}>Restaurantes</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity>
            <Text style={styles.showMore}>Mostrar más búsquedas ⌄</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  banner: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 14,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    width: 34,
  },
  trendName: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
  },
  trendSub: {
    fontSize: 13,
    color: '#6B7280',
  },
  showMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default SearchScreen;
