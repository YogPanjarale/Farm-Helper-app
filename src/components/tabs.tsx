import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

const HomeRoute = () => <HomeScreen/>;

const ScheduleRoute = () => <ScheduleScreen/>


export default () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'schedule', title: 'schecule', icon: 'calendar-clock' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home:HomeRoute ,
    schedule: ScheduleRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};