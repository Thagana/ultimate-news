import { View, Text } from 'react-native'
import React from 'react'

import styles from './ListFooter.style';

export default function ListFooter() {
  return (
    <View style={styles.container}>
      <Text>You have Reached the end</Text>
    </View>
  )
}