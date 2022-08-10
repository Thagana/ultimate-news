import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from './EmptyList.style';

export default function EmptyList() {
  return (
    <View style={styles.container}>
      <View>
        <Text>The List is Empty</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
