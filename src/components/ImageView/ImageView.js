import React from "react";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";

import styles from './ImageView.style';

export default function ImageView(props) {
    const { image, downloaded, name } = props;

    let source = {value: image};
    if (downloaded) {
      if(image === null) {
        source = {
          value: require('../../assets/download.png')
        }
      } else {
        const filepath = FileSystem.documentDirectory + name
        source = {
          value: { uri: filepath }
        }
      }
    } else {
      if(image === '' || image === null) {
        source = { value :require('../../assets/download.png') }
      } else {
        source = {
          value: {uri: image}
        }
      }
    }
  return (
    <Image
      source={
        source.value
      }
      style={styles.cover}
    />
  );
}
