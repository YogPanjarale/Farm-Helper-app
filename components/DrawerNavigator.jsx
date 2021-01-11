import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { TabNavigator } from "./TabNavigator";
import SideBar from "./SideBar";
import TaskList from "../screens/TaskList";

export const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
    },
    TaskList: {
      screen: TaskList,
    },
  },
  {
    contentComponent: SideBar,
  },
  {
    //Todo make initial route name to Home
    initialRouteName: "TaskList",
  }
);
