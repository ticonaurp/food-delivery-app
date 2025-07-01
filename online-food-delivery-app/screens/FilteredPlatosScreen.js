import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import PlatoCard from '../components/PlatoCard';

const FILTER_TITLES = {
  popular: 'Platos Populares',
  descuento: 'Con Descuento',
  entregaRapida: 'Entrega Rápida',
  todoElDia: 'Disponibles Todo el Día',
};

const FilteredPlatosScreen = ({ route }) => {
  const filterType = route?.params?.filterType ?? null;
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'platos'));
        const lista = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          if (data[filterType] === true) {
            lista.push({ id: doc.id, ...data });
          }
        });

        setPlatos(lista);
        setLoading(false);
      } catch (error) {
        console.error('❌ Error al cargar platos:', error);
        setLoading(false);
      }
    };

    fetchPlatos();
  }, [filterType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FILTER_TITLES[filterType] || 'Platos'}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#10B981" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={platos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PlatoCard plato={item} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default FilteredPlatosScreen;
