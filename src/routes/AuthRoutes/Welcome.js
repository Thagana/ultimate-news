import * as React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { useStoreActions } from "easy-peasy";
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Server from '../../service/server';

import styles from './Welcome.style';

export default function Welcome() {
  const [SERVER_MESSAGE, setSeverMessage] = React.useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '832700906683-is3bri8gvq2u7ef16jtti015g8dq8nrr.apps.googleusercontent.com',
    iosClientId: '832700906683-is3bri8gvq2u7ef16jtti015g8dq8nrr.apps.googleusercontent.com',
    androidClientId: '832700906683-is3bri8gvq2u7ef16jtti015g8dq8nrr.apps.googleusercontent.com',
    webClientId: '832700906683-is3bri8gvq2u7ef16jtti015g8dq8nrr.apps.googleusercontent.com',
  });

  const setAuthenticated = useStoreActions((action) => action.setAuthenticated);
  
  const handlePress = async () => {
    try {
      promptAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const authenticate = async (token) => {
    try {
      const response = await Server.login(token);
      if (!response.data.success) {
        setSeverMessage(response.message);
      } else {
        setAuthenticated(response.data.data);
        AsyncStorage
          .setItem('token', response.data.data)
          .then(() => {})
          .catch((error) => {
          console.log(error);
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const { accessToken } = authentication;
        authenticate(accessToken);
      }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.googleGoogleContainer}>
        <View>
          <Image source={require('../../assets/ic_launch.png')} style={styles.Avatar} />
        </View>
        <TouchableOpacity style={styles.googleButton} onPress={handlePress} activeOpacity={0.7} disabled={!request}>
          <View style={styles.iconMargin}>
            <AntDesign name='google' color="#fff" size={20} />
          </View>
          <View>
            <Text style={styles.googleText}>SignIn with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={SERVER_MESSAGE}
        >
        {SERVER_MESSAGE}
      </Snackbar>
    </View>
  )
}