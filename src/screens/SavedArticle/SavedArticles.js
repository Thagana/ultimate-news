import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { useStoreState } from 'easy-peasy';

// components
import Article from '../../components/Articels/Article';

import styles from './SavedAricles.style';

export default function SavedArticles() {
    const articles = useStoreState((state) => state.articles);
    return (
        <View style={styles.container}>
            {articles.length === 0 && <View><Text>No Saved Articles</Text></View>}
            {articles.length > 0 && (<FlatList 
                data={articles}
                renderItem={({item}) => <Article item={item} downloaded={true} />}
                keyExtractor={(_, index) => index.toString()}    
            />)}
        </View>
    )
}
