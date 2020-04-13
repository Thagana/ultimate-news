import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const LinkView = ({ route }) => {
        const { url } = route.params;
        return <WebView source={{ uri: url }}  />;}

export default LinkView
