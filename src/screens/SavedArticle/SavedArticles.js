import React from 'react'
import { FlatList } from 'react-native';
import { View, Text } from 'react-native'
import Article from '../../components/Articels/Article';
import { Store } from '../../functions/articleController';

import styles from './SavedAricles.style';

export default function SavedArticles() {
    const [articles, setArticle] = React.useState([]);

    const fetchArticles = async () => {
        try {
        const data = await Store.getArticles();
        setArticle(data)
        } catch (error) {
            console.log(error);
        }
    } 

    React.useEffect(() => {
        fetchArticles();
    },[])
    return (
        <View style={styles.container}>
            {articles.length === 0 && <View><Text>No Saved Articles</Text></View>}
            {articles.length > 0 && (<FlatList 
                data={articles}
                renderItem={({item}) => <Article item={item} onDownload={() => {}} />}
                keyExtractor={(_, index) => index.toString()}    
            />)}
        </View>
    )
}
