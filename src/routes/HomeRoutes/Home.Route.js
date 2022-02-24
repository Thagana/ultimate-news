import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';


/** Screen */
import SafeStackScreen from "./SaveStack/SaveStack";
import HomeStack from './HomeStack/HomeStack';
import BillingStack from "./BillingStack";
import ProfileStack from "./ProfileStack";

const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#ffff' }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SafeStackScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-cabinet"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={BillingStack}
        options={{
          tabBarLabel: "Subscription",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="wallet-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default TabScreen