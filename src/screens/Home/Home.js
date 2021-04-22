import * as React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import { ActivityIndicator, Snackbar, Searchbar } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";

import Article from "../components/Article";
import { getAllNews, getSearchedNews } from "../../functions/newsController";
import { ScrollView } from "react-native-gesture-handler";

import styles from './Home.style';

const Home = (props) => {
  const [term, setTerm] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [articles, setArticle] = React.useState([]);
  const [articleCount, setArticleCount] = React.useState(0);
  const [connected, setConnected] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDownload = (data) => {
    setMessage('Article Downloaded');
    onToggleSnackBar();
  }

  React.useEffect(() => {
    getAllNews()
      .then((response) => {
        setArticle(response.data.articles);
      })
      .catch();
  }, []);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllNews()
      .then((response) => {
        setArticle(response.data.articles);
        setRefreshing(false);
      })
      .catch();
  }, [refreshing]);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setConnected(true);
      }else {
        setConnected(false);
      }
    });
    return unsubscribe();
  },[connected])

  if (!connected) {
    return (
      <View style={styles.connected}>
          <View>
            <Text style={styles.connectedText}>Not Connected</Text>
          </View>
      </View>
    )
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>
              Ultimate News
            </Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={(term) => setTerm(term)}
            value={term}
            onFocus={() => props.navigation.navigate("Search")}
            style={styles.search}
          />
        </View>
        <View style={styles.weather}>
          <View style={styles.iconContainer}>
            <Text>Icon</Text>
          </View>
          <View>
            <View><Text>Location</Text></View>
            <View><Text>description</Text></View>
          </View>
        </View>
        <View
          style={styles.listContainer}
        >
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ marginBottom: 5 }}>
              {articles.length !== 0 ? (
                articles.map((item, index) => {
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
                      onDownload={onDownload}
                    />
                  );
                })
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <ActivityIndicator color="blue" size="large" />
                </View>
              )}
            </View>
          </ScrollView>
          <View>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            >
            {message}
          </Snackbar>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default Home;
