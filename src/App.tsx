import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import AuthScreen from './screens/AuthScreen';

export default function App() {
  return (
    <SafeAreaView   style={styles.container}>
      <StatusBar style="auto" />
      <AuthScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});