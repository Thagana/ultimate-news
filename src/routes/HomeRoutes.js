import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from '../screens/Home';
import Search from '../screens/Search';

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Ultimate News" component={HomeScreen} />
      <RootStack.Screen name="Search" component={Search} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;