import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from '../../../screens/Profile'

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
    return (
      <ProfileStack.Navigator headerMode="none">
        <ProfileStack.Screen name="Profile" component={Profile} />
      </ProfileStack.Navigator>
    );
};

export default ProfileStackScreen;