import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SponsorsScreen = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('sponsors')
      .orderBy('name')
      .onSnapshot(snapshot => {
        const sponsorsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSponsors(sponsorsList);
      });

    return () => unsubscribe();
  }, []);

  const handleSponsorPress = (website) => {
    if (website) {
      Linking.openURL(website);
    }
  };

  const renderSponsor = ({ item }) => (
    <TouchableOpacity 
      style={styles.sponsorCard}
      onPress={() => handleSponsorPress(item.website)}
    >
      <Image 
        source={{ uri: item.logo }}
        style={styles.sponsorLogo}
        resizeMode="contain"
      />
      <View style={styles.sponsorInfo}>
        <Text style={styles.sponsorName}>{item.name}</Text>
        <Text style={styles.sponsorDescription}>{item.description}</Text>
        {item.website && (
          <Text style={styles.sponsorWebsite}>{item.website}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sponsors}
        renderItem={renderSponsor}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>Patrocinadores</Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum patrocinador encontrado</Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#fff'
  },
  sponsorCard: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center'
  },
  sponsorLogo: {
    width: 80,
    height: 80,
    borderRadius: 10
  },
  sponsorInfo: {
    flex: 1,
    marginLeft: 15
  },
  sponsorName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  sponsorDescription: {
    color: '#666',
    marginTop: 5
  },
  sponsorWebsite: {
    color: '#007AFF',
    marginTop: 5
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
    fontSize: 16
  }
});

export default SponsorsScreen;