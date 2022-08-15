import * as React from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useStoreActions } from "easy-peasy";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Verify.style";
import Server from "../../../service/server";
import Loading from "../../../components/Loading";

type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

type SERVER_MESSAGES = "IDLE" | "SUCCESS" | "ERROR" | "FAILED" | "LOADING";

export default function Verify(props: Props) {
  const { navigation } = props;
  const [code, setCode] = React.useState("");

  const [SERVER_MESSAGE, setSeverMessage] =
    React.useState<SERVER_MESSAGES>("IDLE");

  const login = useStoreActions<any, any>((state) => state.setAuthenticated);

  const handleChange = (val: string) => {
    setCode(val);
  };

  const handleLogin = () => {
    navigation.navigate("signin");
  };

  const mounted = React.useRef(false);

  const handleSend = async () => {
    try {
      if (mounted.current) {
        
        setSeverMessage("LOADING");
        
        const response = await Server.login(code);

        if (response.status !== 200) {
          showMessage({
            message: response.data.message,
            type: "danger",
          });
          return;
        }

        const { data } = response;

        if (data.success) {
          login(data.token);
          await AsyncStorage.setItem("token", data.token);
        } else {
          showMessage({
            message: response.data.message,
            type: "danger",
          });
          setSeverMessage('IDLE');
        }
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "SOMETHING WENT WRONG",
        type: "danger",
      });
    }
  };

  React.useEffect(() => {

    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      {SERVER_MESSAGE === "LOADING" && <Loading />}
      {SERVER_MESSAGE === "IDLE" && (
        <View style={styles.googleGoogleContainer}>
          <View>
            <Image
              source={require("../../../assets/ic_launch.png")}
              style={styles.Avatar}
              resizeMode='contain'
            />
          </View>
          <View>
            <View>
              <TextInput
                placeholder='Enter the code'
                onChangeText={handleChange}
                value={code}
                style={styles.textInput}
                keyboardType='decimal-pad'
              />
            </View>
            <TouchableOpacity
              onPress={handleSend}
              activeOpacity={0.7}
              style={styles.googleButton}
            >
              <Text style={styles.textButton}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.verifyCode}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
