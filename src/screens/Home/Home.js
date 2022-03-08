import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from "react-native";
import { Snackbar } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";

import Article from "../../components/Articels/Article";
import { getAllNews } from "../../functions/newsController";
import styles from './Home.style';
import HeaderList from "../../components/HeaderList/HeaderList";

const Home = (props) => {
  const [term, setTerm] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [articles, setArticle] = React.useState([]);
  const [connected, setConnected] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const mounted = React.useRef(true);

  const onDownload = (data) => {
    setMessage('Article Downloaded');
    onToggleSnackBar();
  }

  const fetchNews = async () => {
    try {
      if (connected) {
        const response = await getAllNews();
        const articles = response.data.articles;
        if(mounted){
          setArticle(articles);
        }
      }
    } catch (error) {
      console.log(error);
    }
  } 
  
  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      if (connected) {
        const response = await getAllNews();
        const articles = response.data.articles;
        setArticle(articles);
        setRefreshing(false);
      }
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  }, [refreshing]);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if(mounted.current){
        if (state.isConnected) {
            setConnected(true);
        }else {
            setConnected(false);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  },[connected])

  React.useEffect(() => {
    fetchNews();
  }, [connected]);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    }
  }, [])

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
        <View
          style={styles.listContainer}
        >
            <FlatList
              ListHeaderComponent={<HeaderList navigation={props.navigation} term={term} setTerm={setTerm}/>}
              data={articles}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({item}) => <Article item={item} onDownload={onDownload} />}
              keyExtractor={(_, index) => index.toString()}
            />
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
