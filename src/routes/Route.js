import * as React from "react";
import { Alert } from "react-native";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

/** Theming */
import {
  Provider as PaperProvider,
} from "react-native-paper";


// Routes
import HomeRoutes from './HomeRoutes';
import SavedRoutes from './SavedRoutes'

const Tab = createMaterialBottomTabNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#ffff' }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeRoutes}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedRoutes}
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
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider >
      <NavigationContainer>
        <TabScreen />
      </NavigationContainer>
    </PaperProvider>
  );
}
