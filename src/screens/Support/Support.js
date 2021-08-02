import * as React from 'react';
import {View, Text, Pressable, Image, Linking} from 'react-native';

import styles from './Support.style';

export default function Support() {
  const handleLaunch = () => {
    Linking.openURL('https://www.buymeacoffee.com/thagana').catch((error) =>
      console.log(error),
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLaunch} style={styles.button}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/coffee.jpeg')}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.text}>Support me</Text>
        </View>
      </Pressable>
    </View>
  );
}