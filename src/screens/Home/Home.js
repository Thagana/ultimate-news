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

import LoadingArticle from '../../components/Articels/LoadingArticle/'
import ErrorArticle from "../../components/Articels/ErrorArticle";

const Home = (props) => {
  const [term, setTerm] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [articles, setArticle] = React.useState([]);
  const [connected, setConnected] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  // SERVER STATES
  const [SERVER_STATE, setServerState] = React.useState('IDLE');

  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const mounted = React.useRef(true);

  const onDownload = () => {
    setMessage('Article Downloaded');
    onToggleSnackBar();
  }

  const fetchNews = async () => {
    try {
      if (connected) {
        const { success, data } = await getAllNews();
        if (mounted) {
          if (success) {
            setArticle(data.data);
            setServerState('SUCCESS');
          } else {
            setMessage('FAILED TO LOAD NEWS ARTICLES');
            setServerState('ERROR');
          }
          setVisible(true)
        }
      }
    } catch (error) {
      setServerState('ERROR');
      setMessage('SOMETHING WENT WRONG PLEASE TRY AGAIN');
      console.log(error);
    }
  } 
  
  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setServerState('LOADING');
      if (connected) {
        const { success, data } = await getAllNews();
        if (success) {
          setArticle(data.data);
          setRefreshing(false);
          setServerState('SUCCESS');
        } else {
          setArticle(data);
          setRefreshing(false);
          setServerState('ERROR');
        }
      }
    } catch (error) {
      console.log(error);
      setRefreshing(false);
      setServerState('ERROR');
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
      {SERVER_STATE === 'SUCCESS' && (
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
            </View>
          </View>
        )}
        {SERVER_STATE === 'LOADING' && (
            <LoadingArticle />
        )}
        {SERVER_STATE === 'ERROR' && (
            <ErrorArticle handleReload={onRefresh} />
        )}
        <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            >
            {message}
        </Snackbar>
    </SafeAreaView>
  );
};

export default Home;
