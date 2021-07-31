import React from 'react'
import { View, Text } from 'react-native'
import { Store } from '../../functions/articleController';

import styles from './SavedAricles.style';

export default function SavedArticles() {
    const [articles, setArticle] = React.useState([]);

    const fetchArticles = async () => {
        try {
        const data = await Store.getArticles();
        console.log(data);
        } catch (error) {
            console.log(error);
        }
    } 

    React.useEffect(() => {
        fetchArticles();
    },[])
    return (
        <View style={styles.container}>
            <Text>Saved articles</Text>
        </View>
    )
}
