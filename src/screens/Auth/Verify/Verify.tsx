import * as React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Snackbar } from "react-native-paper";
import { useStoreActions } from "easy-peasy";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./Verify.style";
import Server from "../../../service/server";

type Props = {
  navigation: {
    navigate(param: string): void;
  }
}

export default function Verify(props: Props) {
  const { navigation } = props;
  const [code, setCode] = React.useState("");
  const [SERVER_MESSAGE, setSeverMessage] = React.useState("");
  const login = useStoreActions<any, any>((state) => state.setAuthenticated);

  const handleChange = (val: string) => {
    setCode(val);
  };
  
  const handleLogin = () => {
    navigation.navigate('signin');
  }
  const mounted = React.useRef(true);

  const handleSend = async () => {
    try {
     if (mounted.current) {
      setSeverMessage("LOADING");
      const response = await Server.login(code);
      if (response.status !== 200) {
        setSeverMessage("SOMETHING_WENT_WRONG");
        return;
      }
      const { data } = response;

      if (data.success) {
        login(data.token);
        await AsyncStorage.setItem('token', data.token);
      } else {
        setSeverMessage("Something went wrong please try again later");
      }
      setSeverMessage("");
     }
    } catch (error) {
      console.log(error);
      setSeverMessage("SOMETHING WENT WRONG");
    }
  };

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    }
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.googleGoogleContainer}>
        <View>
          <Image
            source={require('../../../assets/ic_launch.png')}
            style={styles.Avatar}
          />
        </View>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              placeholder='Enter the code'
              onChangeText={handleChange}
              value={code}
              style={styles.textInput}
              keyboardType="decimal-pad"
            />
          </View>
          <TouchableOpacity
            onPress={handleSend}
            activeOpacity={0.7}
            style={styles.googleButton}
          >
            <Text style={styles.textButton}>
              {SERVER_MESSAGE === "LOADING" ? "Loading ..." : "Send"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signInText}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar visible={SERVER_MESSAGE.length !== 0}>{SERVER_MESSAGE}</Snackbar>
    </View>
  );
}
