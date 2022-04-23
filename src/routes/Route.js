import * as React from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { Text } from 'react-native';
import { useStoreState } from "easy-peasy";
import * as Linking from 'expo-linking';

import Welcome from "./AuthRoutes/Welcome";
import TabScreen from "./HomeRoutes";

export default function App() {
  const isAuth = useStoreState((state) => state.isAuth);
  const linking = {
    prefixes: [Linking.createURL('/'), 'https://theultimatenews.xyz'],
  };
  return (
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        {isAuth ? <TabScreen /> : <Welcome />}  
      </NavigationContainer>
  );
}
