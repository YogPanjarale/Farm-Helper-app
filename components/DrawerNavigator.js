import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import  {TabNavigator} from './TabNavigator'
import SideBar  from './SideBar';
 import SettingScreen from "../screens/SettingsScreen";
// import MyDonations from '../screens/MyDonations'
// import Notifications from '../screens/Notifications'

export const DrawerNavigator = createDrawerNavigator({
  Home : {
    screen : TabNavigator
    },
  Setting :{
    screen:SettingScreen
  },
  },
  {
    contentComponent:SideBar
  },
  {
    initialRouteName : 'Home'
  })