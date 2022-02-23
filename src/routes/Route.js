import * as React from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { useStoreState } from "easy-peasy";

import Welcome from "./AuthRoutes/Welcome";
import TabScreen from "./HomeRoutes";

export default function App() {
  const isAuth = useStoreState((state) => state.isAuth);
  return (
      <NavigationContainer>
        {isAuth ? <TabScreen /> : <Welcome />}        
      </NavigationContainer>
  );
}
