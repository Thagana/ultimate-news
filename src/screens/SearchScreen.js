import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import NetInfo from "@react-native-community/netinfo";

/** Component */
import Article from "./components/Article";

/** news API */
import { getAllNews, getSearchedNews } from "../functions/newsController";
import { ScrollView } from "react-native-gesture-handler";

const Home = (props) => {
  const [term, setterm] = useState("");
  const [articles, setArticle] = useState([]);
  const [articleCount, setArticleCount] = useState(0);
  const [connectd, setconnectd] = useState(true);

  const searchNews = (props) => {
    getSearchedNews(term)
      .then((response) => {
        setArticle(response.data.articles);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 27,
      }}
    >
      <SearchBar
        placeholder="Search"
        onChangeText={(term) => setterm(term)}
        value={term}
        platform={Platform.OS == "ios" ? "ios" : "android"}
        autoFocus
        keyboardAppearance="dark"
        onCancel={() => props.navigation.navigate("Ultimate News")}
        onKeyPress={() => searchNews()}
      />
      {connectd ? (
        <View>
          <ScrollView>
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
                  <Text>Search for News Articles</Text>
                </View>
              )}
            </View>
          </ScrollView>
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
