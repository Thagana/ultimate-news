import * as React from 'react'
import { View, Text, Platform } from 'react-native'
import * as Device from 'expo-device';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { useStoreActions } from 'easy-peasy';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Profile.style'
import Server from '../../service/server';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
}

export default function ProfileStack() {
    const [serverState, setServerState] = React.useState('LOADING');
    const [language, setLanguage] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [pushEnabled, setPushEnabled] = React.useState('Unknown');
    const logOut = useStoreActions((action) => action.logOut);
   
    const handleLogOut = async () => {
        try {
            logOut();
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
    }

    const handleSettings = async (type) => {
        switch (type) {
            case 'PUSH_NOTIFICATION':
                await askForPushNotification();
                break;        
            default:
                break;
        }
    }

    const askForPushNotification = async () => {
        try {
            let token = await registerForPushNotificationsAsync()
            token = String(token);
            const type = 'PUSH_NOTIFICATION';
            const response = await Server.savePushToken(token, type);
            if (response.status === 200) {
                setPushEnabled('True');
            }
        } catch (error) {
            console.log(error);   
        }
    }

    const fetchSettings = async () => {
        try {
            setServerState('LOADING');
            const response = await Server.getSettings();
            if (response.status === 200) {
                if (response.data.data) {
                    const { location, language, pushState } = response.data.data;
                    const pushData = pushState === 0 ? 'False' : 'True';
                    setLocation(location);
                    setLanguage(language);
                    setPushEnabled(pushData)
                    setServerState('SUCCESS');
                } else {
                    setServerState('ERROR');
                }
            } else {
                setServerState('ERROR');
            }
        } catch (error) {
            console.log(error);
            setServerState('ERROR');
        }
    }

    React.useEffect(() => {
        fetchSettings();
    },[]);
    
  return (
      <>
        {serverState === 'LOADING' && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading</Text>
        </View>}
        {serverState === 'ERROR' && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.listItem} onPress={handleLogOut}>
                        <View style={styles.rowItems}>
                            <View style={styles.icons}>
                                <Ionicons name="exit-outline" size={20} color="#000" />
                            </View>
                            <View style={styles.showText}>
                                <Text>Log Out</Text>
                            </View>
                        </View>
                        <View style={styles.rowAction}>
                            <Ionicons name="arrow-forward" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>    
        </View>}
        {serverState === 'SUCCESS' && 
                <View style={styles.container}>
                    <TouchableOpacity style={styles.listItem} onPress={() => {}}>
                        <View style={styles.rowItems}>
                            <View style={styles.icons}>
                                <Ionicons name="language" size={20} color="#000" />
                            </View>
                            <View style={styles.showText}>
                                <Text>News Language [{language}]</Text>
                            </View>
                        </View>
                        <View style={styles.rowAction}>
                            <Ionicons name="arrow-forward" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={() => {}}>
                        <View style={styles.rowItems}>
                            <View style={styles.icons}>
                                <Ionicons name="location-outline" size={20} color="#000" />
                            </View>
                            <View style={styles.showText}>
                                <Text>News Location [{location}]</Text>
                            </View>
                        </View>
                        <View style={styles.rowAction}>
                            <Ionicons name="arrow-forward" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={() => {
                        handleSettings('PUSH_NOTIFICATION')
                    }}>
                        <View style={styles.rowItems}>
                            <View style={styles.icons}>
                                <Ionicons name="settings-outline" size={20} color="#000" />
                            </View>
                            <View style={styles.showText}>
                                <Text>Push Enabled [{pushEnabled}]</Text>
                            </View>
                        </View>
                        <View style={styles.rowAction}>
                            <Ionicons name="arrow-forward" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={handleLogOut}>
                        <View style={styles.rowItems}>
                            <View style={styles.icons}>
                                <Ionicons name="exit-outline" size={20} color="#000" />
                            </View>
                            <View style={styles.showText}>
                                <Text>Log Out</Text>
                            </View>
                        </View>
                        <View style={styles.rowAction}>
                            <Ionicons name="arrow-forward" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
        }

      </>
  )
}
  