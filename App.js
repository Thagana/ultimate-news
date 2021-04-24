import * as React from "react";
import { View, Text } from 'react-native';
import { createStore, StoreProvider, persist, useStoreRehydrated } from "easy-peasy";

import Routes from './src/routes/Route';

import store from "./src/Store/model";

const myStore = createStore(persist(store));

export const RootWrapper = () => {
  const isHydrated = useStoreRehydrated();
  if(isHydrated){
    return <Routes />
  }
  return <View><Text>Loading ...</Text></View>
}

export default function App() {
  return (
      <StoreProvider store={myStore}>
        <RootWrapper />
      </StoreProvider>
  );
}
