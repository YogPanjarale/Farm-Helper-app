import React from "react";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "react-navigation-tabs";
// import BookDonateScreen from '../screens/DonateScreen';
import MotorsScreen from "../screens/MotorsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LightsScreen from "../screens/LightsScreen";
// import { AppStackNavigator } from './StackNavigator'
import { MaterialCommunityIcons } from "@expo/vector-icons";
export const TabNavigator = createBottomTabNavigator({
  Profile: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon name={focused ? "person" : "person-outline"} />
      ),
    },
  },
  MotorsScreen: {
    screen: MotorsScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, color, size }) => {
        size = 25;
        //console.log(size);
        return focused ? (
          <Image
            style={{ width: size, height: size }}
            source={require("../assets/pumpOff.png")}
          />
        ) : (
          <Image
            style={{ width: size, height: size }}
            source={require("../assets/pumpOutline.png")}
          />
        );
      },
      tabBarLabel: "Motors Screen",
    },
  },
  LightsScreen: {
    screen: LightsScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, color, size }) => {
        size = 25;
        //console.log(size);
        return focused ? (
          <Image
            style={{ width: size, height: size }}
            source={require("../assets/light filled.png")}
          />
        ) : (
          <Image
            style={{ width: size, height: size }}
            source={require("../assets/light outline.png")}
          />
        );
      },
      tabBarLabel: "Lights Screen",
    },
  },
});
