import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const usersRef = firestore().collection('users');
      const snapshot = await usersRef
        .where('profession', '>=', searchQuery)
        .where('profession', '<=', searchQuery + '\uf8ff')
        .get();

      const userResults = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setResults(userResults);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setSearching(false);
    }
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity 
      style={styles.userCard}
      onPress={() => navigation.navigate('UserProfile', { userId: item.id })}
    >
      <Image 
        source={{ uri: item.photoURL || 'https://via.placeholder.com/50' }}
        style={styles.userImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name} {item.surname}</Text>
        <Text style={styles.userProfession}>{item.profession}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por profissão..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <FlatList
        data={results}
        renderItem={renderUser}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searching ? 'Buscando...' : 
             searchQuery ? 'Nenhum resultado encontrado' : 'Digite para buscar'}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchBox: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15
  },
  userCard: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  userInfo: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  userProfession: {
    color: '#666',
    marginTop: 2
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666'
  }
});

export default SearchScreen;