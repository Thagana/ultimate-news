import * as React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from '../../screens/Auth/Signin/SignIn';
import Verify from '../../screens/Auth/Verify';

/** RootHomeStack */
const RootStack = createStackNavigator();

export default function Welcome() {
  
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="signin" component={SignIn} />
      <RootStack.Screen name="verify" component={Verify} />
    </RootStack.Navigator>

  )
}