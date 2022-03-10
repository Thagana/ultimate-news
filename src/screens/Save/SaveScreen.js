import * as React from 'react';
import { View, Text, FlatList } from 'react-native'
import { useStoreState } from 'easy-peasy';
import styles from './SaveScreen.style';

import { Store } from '../../functions/articleController';

/** Components */
import Article from '../../components/Articels';


const SafeScreen = () => {
    const articles = useStoreState((state) => state.articles)
    // const [articles, setArticles] = React.useState([]);
    // React.useEffect(() => {
    //     const interval = setInterval(async () => {
    //         const results = await Store.getArticles()
    //         setArticles(results)
    //       }, 10000); 
    //     return () => clearInterval(interval);
    // },[]);

    return (
        <View style={styles.container}>
            {articles.length !== 0 && (
                <FlatList
                    data={articles}
                    renderItem={({ item }) => <Article item={item} />}
                    keyExtractor={(_, index) => index.toString()}
                />
            )}
            {articles.length === 0 && (
                <View>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center' }}
                    >
                        <Text style={{ fontSize: 20 }}>View Offline articles</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>
                            Articles
                        </Text>
                    </View>        
                </View>
            )}
        </View>
    )
}

export default SafeScreen
