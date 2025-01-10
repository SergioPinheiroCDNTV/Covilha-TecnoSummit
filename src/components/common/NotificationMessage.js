import React, { useEffect } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const NotificationMessage = ({ message, type = 'info', duration = 3000, onDismiss }) => {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onDismiss());
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const backgroundColor = {
    success: '#4caf50',
    error: '#f44336',
    info: '#2196f3',
    warning: '#ff9800',
  }[type];

  return (
    <Animated.View style={[
      styles.container,
      { backgroundColor, transform: [{ translateY }] }
    ]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
    zIndex: 999,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NotificationMessage;