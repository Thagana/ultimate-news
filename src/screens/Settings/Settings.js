import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Switch } from 'react-native-paper';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Settings = () => {
    const [isSwitchOn, _onToggleSwitch] = useState(false);
    
    const isDarkMode = useStoreState(state => state.isDarkMode)
    const toggleTheme = useStoreActions(action => action.toggleTheme);

    return (
        <View style={{ flex: 1}}>
           <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ fontSize: 20 }}>News Sources API</Text>
           </View>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
                <View>
                    <Text style={{ color: isDarkMode ? '#fff': '#000'  }}>
                        International
                    </Text>
                </View>
                <Switch
                    value={isSwitchOn}
                    onValueChange={(value) => _onToggleSwitch(value)}
                />
           </View>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5, marginVertical: 5 }}>
                <View>
                    <Text style={{ color: isDarkMode ? '#fff': '#000' }}>
                        Dark Theme
                    </Text>
                </View>
                <Switch
                    value={isDarkMode}
                    onValueChange={(value) => toggleTheme(value)}
                />
           </View>
        </View>
    )
}

export default Settings
