import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { DeckSwiper} from 'native-base';
/** State Manager */
import { useStoreState } from 'easy-peasy';
import { Store } from '../functions/articleController';


/** Components */
import Article from './components/Articleo';
import NoArticle from './components/Noarticle';
import { ScrollView } from 'react-native-gesture-handler';

const SafeScreen = () => {
    const articles = useStoreState(state => state.articles);
    useEffect(() => {
        
    },[])
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{ flexDirection: 'row', justifyContent: 'center' }}
            >
                <Text style={{ fontSize: 20 }}>View Offline articles</Text>
            </View>
            <View>
                {
                    articles.length !== 0 ? (
                        <DeckSwiper
                            dataSource={articles}
                            renderItem={item => 
                                <Article
                                    key={item.id}
                                    id={item.id}
                                    source={item.source}
                                    author={item.author}
                                    image={item.image}
                                    title={item.title}
                                    description={item.description}
                                    dateAdded={item.dateAdded}
                                    datePosted={item.datePosted}
                                    />
                            }
                        />
                    ) : <NoArticle />
                }
            </View>        
        </View>
    )
}

export default SafeScreen
