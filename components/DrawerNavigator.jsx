import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import  {TabNavigator} from './TabNavigator'
import SideBar  from './SideBar';
 import SettingScreen from "../screens/SettingsScreen";
 import LightsScreen from '../screens/LightsScreen'
// import MyDonations from '../screens/MyDonations'
// import Notifications from '../screens/Notifications'

export const DrawerNavigator = createDrawerNavigator({
  Home : {
    screen : TabNavigator
    },
  Setting :{
    screen:SettingScreen
  },
  LightsScreen:{
    screen:LightsScreen
  }
  },
  {
    contentComponent:SideBar
  },
  {
    initialRouteName : 'Home'
  })