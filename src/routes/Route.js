import * as React from "react";
import { Alert } from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

/** Theming */
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

/** Screen */
import HomeScreen from "../screens/Home/Home";
import LinkView from "../screens/LinkView";
import SafeScreen from "../screens/SafeScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import SearchScreen from "../screens/SearchScreen";

/** State Manager */
import { useStoreActions, useStoreState } from "easy-peasy";

/** Functions */
import { Store } from "../functions/articleController";

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

const SafeStack = createStackNavigator();
const SafeStackScreen = () => {
  const removeAll = useStoreActions((action) => action.removeAllArticles);
  const isDarkMode = useStoreState((state) => state.isDarkMode);

  return (
    <SafeStack.Navigator>
      <SafeStack.Screen
        name="Saved"
        component={SafeScreen}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  padding: 5,
                }}
                onPress={() => {
                  Alert.alert(
                    "Delete all",
                    "You are about to delete all saved articles",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          Store.removeAllArticles();
                          removeAll();
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={30}
                  color={isDarkMode ? "#fff" : "#000"}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </SafeStack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#ffff' }}
    >
      <Tab.Screen
        name="Feed"
        component={RootStackScreen}
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
    </Tab.Navigator>
  );
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};
const CombinedDarkTheme = { ...PaperDarkTheme, ...NavigationDarkTheme };

export default function App() {
  const isDarkMode = useStoreState((state) => state.isDarkMode);
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider>
      <NavigationContainer>
        <TabScreen />
      </NavigationContainer>
    </PaperProvider>
  );
}
