import * as React from "react";
import { View, Text } from 'react-native';
import { createStore, StoreProvider, persist, useStoreRehydrated } from "easy-peasy";


// routes
import Routes from './src/routes/Route';

// store
import store from "./src/Store/model";
import storage from './src/Store/storage/storage';

const myStore = createStore(persist(store, {
  storage,
}));

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
