import React from "react";
import { Image } from "react-native";

import styles from './ImageView.style';

export default function ImageView(props) {
    const { image } = props;
  return (
    <Image
      source={
        image === null || image === ''
          ? require("../../assets/download.png")
          : { uri: image }
      }
      style={styles.cover}
    />
  );
}
