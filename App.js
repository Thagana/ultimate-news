import * as React from "react";
import { View, Text } from 'react-native';
import { createStore, StoreProvider, persist, useStoreRehydrated } from "easy-peasy";
import * as Notifications from 'expo-notifications';
import Routes from './src/routes/Route';

import store from "./src/Store/model";

const myStore = createStore(persist(store));

export const RootWrapper = () => {

  // const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  const isHydrated = useStoreRehydrated();

  React.useEffect(() => {
    
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(() => {
      // setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
