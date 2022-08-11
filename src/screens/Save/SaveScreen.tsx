import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { useStoreState } from "easy-peasy";
import styles from "./SaveScreen.style";

/** Components */
import Article from "../../components/Articles";

const SafeScreen = () => {
  const articles = useStoreState((state) => state.articles);
  const mapped = articles.map(
    (item: {
      source: { name: string };
      author: string;
      name: string;
      urlToImage: string;
      publishedAt: string;
      url: string;
      title: string;
      description: string;
      image: string;
    }) => ({
      url: item.url,
      urlToImage: item.image,
      title: item.title,
      description: item.description,
      source: item.source,
      publishedAt: item.publishedAt,
      author: item.author,
    })
  );
  return (
    <View style={styles.container}>
      {articles.length !== 0 && (
        <FlatList
          data={mapped}
          renderItem={({ item }) => <Article item={item} isDownload={true} />}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      {articles.length === 0 && (
        <View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontSize: 20 }}>View Offline articles</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text>Articles</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default SafeScreen;
