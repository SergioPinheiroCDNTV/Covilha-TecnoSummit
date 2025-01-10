import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const LoadingSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default LoadingSpinner;