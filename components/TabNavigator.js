import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import BookDonateScreen from '../screens/DonateScreen';
import MotorsScreen from "../screens/MotorsScreen";
import SettingsScreen from '../screens/SettingsScreen'
// import { AppStackNavigator } from './StackNavigator'


export const TabNavigator = createBottomTabNavigator({
 /* HomeScreen : {
    screen: HomeScreen,
    navigationOptions :{
      tabBarIcon : <Icon name={'home'}/>,
      tabBarLabel : "Home",
    }
  },
  ExchangeScreen:{
      screen:ExchangeScreen,
      navigationOptions :{
        tabBarIcon : <Icon name={'cached'}/>,
        tabBarLabel : "Exchange",
      }
  }*/
  MotorsScreen:{
      screen:MotorsScreen,
      navigationOptions :{
          tabBarIcon:(<Icon name="home"/>),
            tabBarLabel: "Motors Screen"
      }
  },
  Profile:{
      screen:SettingsScreen,
      navigationOptions:{
          tabBarIcon:(<Icon name="person"/>)
      }
  }

}
  );