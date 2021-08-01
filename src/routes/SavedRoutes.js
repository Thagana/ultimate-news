import * as React from 'react'
import { Alert } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';

/** Screen */
import { TouchableOpacity } from "react-native-gesture-handler";

/** State Manager */
import { useStoreActions } from "easy-peasy";

/** Functions */
import SavedArticles from "../screens/SavedArticle";

const SafeStack = createStackNavigator();

const SafeStackScreen = () => {
  const removeAll = useStoreActions((action) => action.removeAllArticles);

  return (
    <SafeStack.Navigator>
      <SafeStack.Screen
        name="Saved"
        component={SavedArticles}
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
                  color="#000"
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