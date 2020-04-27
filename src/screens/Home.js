import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView, Platform } from "react-native";
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

  const searchNews = () => {
    getSearchedNews(term)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(errro));
  };

  useEffect(() => {
    getAllNews()
      .then((response) => {
        // console.log(response.data.articles);
        setArticle(response.data.articles);
      })
      .catch();
  }, []);
  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Search"
        onChangeText={(term) => setterm(term)}
        value={term}
        platform={Platform.OS == "ios" ? "ios" : "android"}
        onFocus={() => props.navigation.navigate("Search")}
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
                  <ActivityIndicator color="blue" size="large" />
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
