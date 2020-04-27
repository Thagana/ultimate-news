import * as React from "react";
import { createStore, StoreProvider, useStoreActions } from "easy-peasy";

import Root from "./Root";

/** State Manager */
import store from "./src/Store/model";

const myStore = createStore(store);

export default function App() {
  return (
    <StoreProvider store={myStore}>
      <Root />
    </StoreProvider>
  );
}
