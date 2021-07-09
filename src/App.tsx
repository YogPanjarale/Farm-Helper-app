import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import AuthScreen from './screens/AuthScreen';
import {auth} from './firebase';
export default function App() {
    const [authState, setAuthState] = useState(auth().currentUser!=null)
   auth().onAuthStateChanged(user => { 
       setAuthState(user!=null);
   })
  return (
    <SafeAreaView   style={styles.container}>
      <StatusBar style="auto" />
      <AuthScreen/>
      <Text>{JSON.stringify(authState)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});