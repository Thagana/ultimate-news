import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Support from '../screens/Support';

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Support" component={Support} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;