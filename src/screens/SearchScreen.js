import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
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

  const searchNews = async() => {
    try {
      const response = await getSearchedNews(term);
      const data = await response.data.articles;
      setArticle(data);
    } catch (error) {
      console.log(error);
    }
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
        keyboardAppearance="dark"
        onCancel={() => props.navigation.navigate("Ultimate News")}
        onKeyPress={() => searchNews()}
      />
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
    </SafeAreaView>
  );
};

export default Home;
