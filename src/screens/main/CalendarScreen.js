import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (selectedDate) {
      loadEvents(selectedDate);
    }
  }, [selectedDate]);

  const loadEvents = async (date) => {
    try {
      const snapshot = await firestore()
        .collection('events')
        .where('date', '==', date)
        .get();

      const eventsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setEvents(eventsList);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventTime}>{item.time}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#007AFF' }
        }}
        theme={{
          todayTextColor: '#007AFF',
          selectedDayBackgroundColor: '#007AFF'
        }}
      />
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Eventos do Dia</Text>
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.noEvents}>Nenhum evento para esta data</Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  eventsContainer: {
    flex: 1,
    padding: 15
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  eventCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  eventTime: {
    color: '#666',
    marginTop: 5
  },
  eventDescription: {
    marginTop: 5
  },
  noEvents: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20
  }
});

export default CalendarScreen;