import React, { useState, useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

/** Component */
import Article from './components/Article';

/** news API */
import { getAllNews, getSearchedNews } from '../functions/newsController';
import { ScrollView } from 'react-native-gesture-handler';

const Home = (props) => {
    const [term, setterm] = useState('');
    const [articles, setArticle] = useState([])
    const [articleCount, setArticleCount] = useState(0);
    const [connectd, setconnectd] = React.useState(null);

    const searchNews = () => {
        
        getSearchedNews(term)
                .then(response => {
                    setArticle(response.data.articles);
                }).catch(error => console.log(errro))
      }

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if(state.isConnected){
              setconnectd(true);
            }else{
              setconnectd(false);
            }
          });
        return unsubscribe()
    },[connectd])
    return (
        <View>
            <Searchbar
                    placeholder="Search"
                    onChangeText={(term) => setterm(term)}
                    value={term}
                    onIconPress={searchNews}
            />
            {
                connectd ? (
                    <View>
                        <ScrollView>
                            <View style={{ marginBottom: 5 }}>
                                {
                                articles.length !== 0 ? articles.map((item, index) => {
                                    return (
                                        <Article
                                            key={index}
                                            source={item.source}
                                            author={item.author}
                                            image={item.urlToImage}
                                            publishedAt={item.publishedAt}
                                            title={item.title}
                                            description={item.description}
                                            url={item.url}
                                            navigation={props.navigation}
                                        />
                                    )
                                }) : (
                                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                                        <ActivityIndicator  color="blue" size="large"  />
                                    </View>
                                )
                            }
                            </View>
                        </ScrollView>
                </View>
                ) : (
                    <View>
                        <Image source={require('../assets/no_internet.png')}  />
                    </View>

                )
            }
        </View>
    )
}

export default Home
