import * as React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';


import styles from './ProfileStack.style'

export default function ProfileStack() {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.listItem} onPress={() => {}}>
            <View style={styles.rowItems}>
                <View style={styles.icons}>
                    <Ionicons name="language" size={20} color="#000" />
                </View>
                <View style={styles.showText}>
                    <Text>Language</Text>
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
                    <Text>Location</Text>
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
        <TouchableOpacity style={styles.listItem} onPress={() => {}}>
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
  )
}