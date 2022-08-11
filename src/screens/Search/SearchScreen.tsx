import * as React from "react";
import { View, Text, SafeAreaView, Platform } from "react-native";
import { SearchBar } from "react-native-elements";

/** Component */
import Article from "../../components/Articles";


/** news API */
import { getSearchedNews } from "../../functions/newsController";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  navigation: {
    navigate(param: string): void;
  }
}

const Home = (props: Props) => {
  const [term, setterm] = React.useState("");
  const [articles, setArticle] = React.useState([]);
  const [SERVER_STATE, setServerSate] = React.useState('IDLE');

  const handleSearch = async() => {
    try {
      const { data, success } = await getSearchedNews(term);
      if (success) {
        const mapped = data.map((item: { source: { name: string }, author: string, name: string, urlToImage: string, publishedAt: string, url: string, title: string, description: string }) => ({
          source: item.source.name || 'unknown',
          author: item.author || 'unknown',
          urlToImage: item.urlToImage,
          publishedAt: item.publishedAt,
          title: item.title,
          url: item.url || 'https://theultimatenews.xyz',
          description: item.description
        }))
        setArticle(mapped);
        setServerSate('SUCCESS');
      } else {
        setServerSate('ERROR');
      }
    } catch (error) {
      console.log(error);
      setServerSate('ERROR');
    }
  };

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
      />
        <View>
          <ScrollView>
            <View style={{ marginBottom: 5 }}>
              {SERVER_STATE === 'SUCCESS' && (
                articles.map((item, index) => {
                  return (
                    <Article
                      key={index}
                      item={item}
                    />
                  );
                })
              )} 
              {SERVER_STATE === 'IDLE'  && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={handleSearch} 
                    disabled={term === ''}
                    style={{
                          flexDirection: 'row',
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: '#4032a8',
                          width: 200,
                          height: 30,
                          margin: 10,
                          borderRadius: 10,
                  }}>
                    <Text style={{
                      color: '#fff'
                    }}>
                      FIRE SEARCH
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {
                SERVER_STATE === 'ERROR' && (
                  <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                    <Text>
                      FAILED TO SEARCH
                    </Text>
                </View>
                )
              }
            </View>
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};

export default Home;
