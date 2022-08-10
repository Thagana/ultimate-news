import * as React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { PropTypes } from 'prop-types';

import styles from './Signin.style';
import Server from '../../../service/server';

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export default function SignIn(props) {
  const { navigation } = props;
  const [_, setSeverMessage] = React.useState('');
  const [STATE_MESSAGE, setStateMessage] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleChange = (val) => {
    setEmail(val);
  }

  const handleAuth = async () => {
    try {
        setStateMessage('LOADING');
      if (!validateEmail(email)) {
          setSeverMessage('EMAIL NOT VALID');
          setStateMessage('ERROR');
        return;
      }
      const response = await Server.register(email);

      if (response.status !== 200) {
        setSeverMessage('SOMETHING WENT WRONG')
        setStateMessage('ERROR');
        return;
      }
      const { data } = response;

      setSeverMessage(data.message);
      navigation.navigate('verify');
    } catch (error) {
      console.log(error);
      setSeverMessage('SOMETHING WENT WRONG, PLEASE TRY AGAIN');
      setStateMessage('ERROR');
    }
  }

  const handleNavigation = () => {
    navigation.navigate('verify');
  }

  return (
    <View style={styles.container}>
      <View style={styles.googleGoogleContainer}>
        <View>      
          <Image source={{  uri: "https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4" }} style={styles.Avatar} />
        </View>
        <View>
            <View>
                <TextInput 
                  placeholder='Enter Email' 
                  value={email} 
                  onChangeText={handleChange} 
                  keyboardType="email-address"  
                  style={styles.textInput}
                  autoCapitalize='none'
                  />
            </View>
            <View>
                <TouchableOpacity onPress={handleAuth} activeOpacity={0.7} style={styles.googleButton}>
                    <Text style={styles.textButton}>{STATE_MESSAGE === 'LOADING' ? 'Loading ...' : 'Send'}</Text>
                </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.verifyCode}>
                  Verify Code
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

SignIn.propTypes = {
  navigation: PropTypes.object
}