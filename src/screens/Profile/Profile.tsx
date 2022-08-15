import * as React from "react";
import { View, Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useStoreActions } from "easy-peasy";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./Profile.style";
import Server from "../../service/server";

export default function ProfileStack() {
  const [serverState, setServerState] = React.useState("LOADING");
  const [language, setLanguage] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [pushEnabled, setPushEnabled] = React.useState("Unknown");

  const logOut = useStoreActions<any, any>((action) => action.logOut);

  const handleLogOut = async () => {
    try {
      logOut();
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSettings = async () => {
    try {
      setServerState("LOADING");
      const response = await Server.getSettings();
      if (response.status === 200) {
        if (response.data.data) {
          const { location, language, pushState } = response.data.data;
          const pushData = pushState === 0 ? "False" : "True";
          setLocation(location);
          setLanguage(language);
          setPushEnabled(pushData);
          setServerState("SUCCESS");
        } else {
          setServerState("ERROR");
        }
      } else {
        setServerState("ERROR");
      }
    } catch (error) {
      console.log(error);
      setServerState("ERROR");
    }
  };

  React.useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <>
      {serverState === "LOADING" && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading</Text>
        </View>
      )}
      {serverState === "ERROR" && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity style={styles.listItem} onPress={handleLogOut}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name='exit-outline' size={20} color='#000' />
              </View>
              <View style={styles.showText}>
                <Text>Log Out</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name='arrow-forward' size={20} color='#000' />
            </View>
          </TouchableOpacity>
        </View>
      )}
      {serverState === "SUCCESS" && (
        <View style={styles.container}>
          <TouchableOpacity style={styles.listItem} onPress={() => {}}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name='language' size={20} color='#000' />
              </View>
              <View style={styles.showText}>
                <Text>News Language [{language}]</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name='arrow-forward' size={20} color='#000' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={() => {}}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name='location-outline' size={20} color='#000' />
              </View>
              <View style={styles.showText}>
                <Text>News Location [{location}]</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name='arrow-forward' size={20} color='#000' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={() => {}}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name='settings-outline' size={20} color='#000' />
              </View>
              <View style={styles.showText}>
                <Text>Push Enabled [True]</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name='arrow-forward' size={20} color='#000' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={handleLogOut}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name='exit-outline' size={20} color='#000' />
              </View>
              <View style={styles.showText}>
                <Text>Log Out</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name='arrow-forward' size={20} color='#000' />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
