import * as React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import styles from './Loading.style';

export default function Loading() {

  const animation = React.useRef(null);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.illustration}
        source={require("../../assets/loading.json")}
      />
    </View>
  );
}
