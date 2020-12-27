import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'
import {TabNavigator} from './components/TabNavigator'
import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
import {DrawerNavigator} from './components/DrawerNavigator'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      /*<View style={styles.container}>
      <TouchableOpacity style = {{
        borderColor:'#ffaa00',
        borderWidth:2,
        padding:10,
        borderRadius:20
        }}>
      <Text>I am not working</Text>
      </TouchableOpacity>
    </View>*/

      <AppContainer />
      );
  }
}

export default App;



var SwitchNavigator = createSwitchNavigator({
  // AnimationScreen:{screen:AnimationScreen},
  
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:DrawerNavigator},
 
  

  
})
var AppContainer = createAppContainer(SwitchNavigator)