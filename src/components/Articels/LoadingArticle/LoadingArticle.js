import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './LoadingArticle.style';

export default function LoadingArticle() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  )
}