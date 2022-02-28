import * as React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { useStoreActions } from 'easy-peasy';

import styles from './Profile.style'
import Server from '../../service/server';

export default function ProfileStack() {
    const [serverState, setServerState] = React.useState('LOADING');
    const [language, setLanguage] = React.useState('');
    const [frequency, setFrequency] = React.useState(0);
    const [location, setLocation] = React.useState('');

    const logOut = useStoreActions((action) => action.logOut);
    const handleLogOut = () => {
        logOut()
    }

    const fetchSettings = async () => {
        try {
            setServerState('LOADING');
            const response = await Server.getSettings();
            const { location, language, frequency } = response.data.data;
            setLocation(location);
            setLanguage(language);
            setFrequency(frequency);
            setServerState('SUCCESS');
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
        {serverState === 'LOADING' && <View><Text>Loading</Text></View>}
        {serverState === 'ERROR' && <View><Text>ERROR</Text></View>}
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
                    <TouchableOpacity style={styles.listItem} onPress={() => {}}>
                        <View style={styles.rowItems}>
                            <View style={styles.icons}>
                                <Ionicons name="settings-outline" size={20} color="#000" />
                            </View>
                            <View style={styles.showText}>
                                <Text>News Settings</Text>
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