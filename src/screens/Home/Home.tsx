import * as React from "react";
import {
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Article from "../../components/Articels/Article";
import { getAllNews } from "../../functions/newsController";
import styles from "./Home.style";
import HeaderList from "../../components/HeaderList/HeaderList";

import LoadingArticle from "../../components/Articels/LoadingArticle";
import ErrorArticle from "../../components/Articels/ErrorArticle";
import EmptyList from "../../components/EmptyList";
import ListFooter from "../../components/ListFooter";

import UniqueNameSet from "../../utils/UniqueNameSet";
import NotConnected from "../../components/NotConnected";

type Props = {
  navigation: {
    navigate(param: string): void;
  }
}

const Home = (props: Props) => {
  const [term, setTerm] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [articles, setArticle] = React.useState<any>([]);
  const [connected, setConnected] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageEnd, setPageEnd] = React.useState(false);
  const [size] = React.useState(10);

  // SERVER STATES
  const [SERVER_STATE, setServerState] = React.useState("IDLE");

  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const mounted = React.useRef(true);

  const onDownload = () => {
    setMessage("Article Downloaded");
    onToggleSnackBar();
  };

  const fetchNews = async () => {
    try {
      if (connected) {
        const { success, data } = await getAllNews(page, size);
        if (mounted.current) {
          if (success) {
            if (data.data.length === 0) {
              setPageEnd(true);
            } else {
              setArticle((prev: any) =>
                Array.from(new UniqueNameSet([...prev, ...data.data]).values())
              );
            }
            setServerState("SUCCESS");
          } else {
            setMessage("FAILED TO LOAD NEWS ARTICLES");
            setServerState("ERROR");
          }
        }
      }
    } catch (error) {
      setServerState("ERROR");
      setMessage("SOMETHING WENT WRONG PLEASE TRY AGAIN");
      console.log(error);
    }
  };

  const fetchMoreData = () => {
    if (!pageEnd && !refreshing) {
      setPage(page + 1);
    }
  };

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setServerState("LOADING");
      if (connected) {
        const { success, data } = await getAllNews(page, size);
        if (success) {
          setArticle((prev: any) =>
            Array.from(new UniqueNameSet([...prev, ...data.data]).values())
          );
          setRefreshing(false);
          setServerState("SUCCESS");
        } else {
          setRefreshing(false);
          setServerState("ERROR");
        }
      }
    } catch (error) {
      console.log(error);
      setRefreshing(false);
      setServerState("ERROR");
    }
  }, [refreshing]);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (mounted.current) {
        if (state.isConnected) {
          setConnected(true);
        } else {
          setConnected(false);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [connected]);

  React.useEffect(() => {
    fetchNews();
  }, [connected, page]);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    }
  }, [])

  if (!connected) {
    return <NotConnected />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {SERVER_STATE === "SUCCESS" && (
        <View style={styles.listContainer}>
          <FlatList
            data={articles}
            ListHeaderComponent={
              <HeaderList
                navigation={props.navigation}
                term={term}
                setTerm={setTerm}
              />
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={ListFooter}
            ListEmptyComponent={EmptyList}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
            renderItem={({ item }) => (
              <Article item={item} onDownload={onDownload} />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          <View></View>
        </View>
      )}
      {SERVER_STATE === "LOADING" && <LoadingArticle />}
      {SERVER_STATE === "ERROR" && <ErrorArticle handleReload={onRefresh} />}
    </SafeAreaView>
  );
};

export default Home;
