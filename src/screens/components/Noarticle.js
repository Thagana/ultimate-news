import React from 'react'
import { View, Text, Image } from 'react-native'

const Noarticle = () => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../assets/empty.png')} />
        </View>
    )
}

export default Noarticle
