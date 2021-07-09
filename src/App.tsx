import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform ,StatusBar} from 'react-native';
import AuthScreen from './screens/AuthScreen';
import {auth} from './firebase';
import Tabs from './components/tabs';
export default function App() {
    const [authState, setAuthState] = useState(auth().currentUser!=null)
   auth().onAuthStateChanged(user => { 
       setAuthState(user!=null);
   })
  return (
    <SafeAreaView   style={styles.container}>
      {authState?<Tabs/>:<AuthScreen/>}
      {/* <Text>{JSON.stringify(authState)}</Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});