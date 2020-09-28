import React, { useState, useEffect } from "react";
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

import Article from "./components/Article";
import { getAllNews, getSearchedNews } from "../functions/newsController";
import { ScrollView } from "react-native-gesture-handler";

const Home = (props) => {
  const [term, setterm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticle] = useState([]);
  const [articleCount, setArticleCount] = useState(0);
  const [connectd, setconnectd] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDownload = (data) => {
    setMessage('Article Downloaded');
    onToggleSnackBar();
  }
  useEffect(() => {
    getAllNews()
      .then((response) => {
        // console.log(response.data.articles);
        setArticle(response.data.articles);
      })
      .catch();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllNews()
      .then((response) => {
        // console.log(response.data.articles);
        setArticle(response.data.articles);
        setRefreshing(false);
      })
      .catch();
  }, [refreshing]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 27,
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={(term) => setterm(term)}
        value={term}
        onFocus={() => props.navigation.navigate("Search")}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5},
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
          borderRadius: 50,
          marginTop: 3,
          color: '#fff',
        }}
      />
      {connectd ? (
        <View
          style={{
            flex: -1,
          }}
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
      ) : (
        <View>
          <Image source={require("../assets/no_internet.png")} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
