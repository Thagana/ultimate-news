import React, { useState } from "react";
import { View, Text } from "react-native";
import { useStoreState, useStoreActions, State } from "easy-peasy";
import { Model } from "../../Store/model";

const Settings = () => {
  const [isSwitchOn, _onToggleSwitch] = useState("");

  const isDarkMode = useStoreState((state: State<Model>) => state.isDarkMode);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>News Sources API</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 5,
        }}
      >
        <View>
          <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
            International
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 5,
          marginVertical: 5,
        }}
      >
        <View>
          <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
            Dark Theme
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;
