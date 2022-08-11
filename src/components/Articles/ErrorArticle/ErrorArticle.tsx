import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './ErrorArticle.style';


type Props = {
  handleReload(): void;
}

export default function ErrorArticle(props: Props): JSX.Element {
  const { handleReload } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleReload} style={styles.loadingButton} activeOpacity={0.7}>
        <Text style={styles.loadingText}>ERROR - PRESS TO RELOAD</Text>
      </TouchableOpacity>
    </View>
  )
}