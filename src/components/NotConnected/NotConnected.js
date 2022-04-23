import { View, Text } from "react-native";
import React from "react";

import styles from "./NotConnected.style";

export default function NotConnected() {
  return (
    <View style={styles.connected}>
      <View>
        <Text style={styles.connectedText}>Not Connected</Text>
      </View>
    </View>
  );
}
