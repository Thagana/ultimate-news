import * as React from "react";
import { createStore, StoreProvider, persist } from "easy-peasy";

import Routes from './src/routes/Route';

import store from "./src/Store/model";

const myStore = createStore(persist(store));

export default function App() {
  return (
    <StoreProvider store={myStore}>
      <Routes />
    </StoreProvider>
  );
}
