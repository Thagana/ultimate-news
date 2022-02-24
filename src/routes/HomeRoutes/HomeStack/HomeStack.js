import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../../screens/Home/Home";
import LinkView from "../../../screens/LinkView";
import SearchScreen from "../../../screens/Search";

/** RootHomeStack */
const RootStack = createStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Ultimate News" component={HomeScreen} />
      <RootStack.Screen name="Article" component={LinkView} />
      <RootStack.Screen name="Search" component={SearchScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;