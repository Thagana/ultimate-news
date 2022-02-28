import * as React from 'react';
import { View, Text } from 'react-native'
/** State Manager */
import { useStoreState } from 'easy-peasy';


/** Components */
import Article from './components/Articleo';
import NoArticle from './components/Noarticle';

const SafeScreen = () => {
    const articles = useStoreState(state => state.articles);
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{ flexDirection: 'row', justifyContent: 'center' }}
            >
                <Text style={{ fontSize: 20 }}>View Offline articles</Text>
            </View>
            <View>
                <Text>
                    Articles
                </Text>
            </View>        
        </View>
    )
}

export default SafeScreen
