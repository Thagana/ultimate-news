import * as React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useStoreActions, useStoreState } from 'easy-peasy';
import SafeScreen from "../../../screens/Save";

/** Functions */
import { Store } from "../../../functions/articleController";

const SafeStack = createStackNavigator();
const SafeStackScreen = () => {
  const removeAll = useStoreActions<any, any>((action) => action.removeAllArticles);
  const isDarkMode = useStoreState((state) => state.isDarkMode);

  const showAlert = () => {
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
  }
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
                  showAlert();
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

export default SafeStackScreen;