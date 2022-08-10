import React from "react";
import { View, Text, Image, TextInput } from "react-native";

import styles from "./Header.style";

type Props = {
  term: string;
  setTerm(param: string): void;
  navigation: {
    navigate(param: string): void;
  };
};

export default function HeaderList(props: Props) {
  const { term, setTerm, navigation } = props;

  const mounted = React.useRef(true);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Radyse Moon</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Search'
          onChangeText={(term) => setTerm(term)}
          value={term}
          onFocus={() => navigation.navigate("Search")}
          style={styles.search}
        />
      </View>
    </>
  );
}
