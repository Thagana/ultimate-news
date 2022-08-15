import * as React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Platform, Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import styles from "./Signin.style";
import Server from "../../../service/server";
import { FormValidator } from "../../../helpers/FormValidator";
import Loading from "../../../components/Loading";

type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

type STATUS_MESSAGES = "LOADING" | "FAILED" | "ERROR" | "SUCCESS" | "IDLE";

export default function SignIn(props: Props) {
  const { navigation } = props;
  const [STATE_MESSAGE, setStateMessage] =
    React.useState<STATUS_MESSAGES>("IDLE");
  const [email, setEmail] = React.useState("");

  const handleChange = (val: string) => {
    setEmail(val);
  };


  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }
  
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  
    return token;
  }
  

  const handleAuth = async () => {
    try {
      if (!FormValidator.emailValidator(email)) {
        showMessage({
          message: "Email is not valid",
          type: "danger",
        });
        return;
      }

      setStateMessage("LOADING");

      const token = await registerForPushNotificationsAsync();

      const response = await Server.register(email, token || '');

      if (response.status !== 200) {
        showMessage({
          message: response.data.message,
          type: "danger",
        });
        setStateMessage('IDLE');
      } else {
        navigation.navigate("verify");
        setStateMessage("IDLE");
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: "SOMETHING WENT WRONG, PLEASE TRY AGAIN",
        type: "danger",
      });
      setStateMessage('IDLE');
    }
  };

  const handleNavigation = () => {
    navigation.navigate("verify");
  };

  return (
    <View style={styles.container}>
      {STATE_MESSAGE === "LOADING" && <Loading />}
      {STATE_MESSAGE === "IDLE" && (
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
                placeholder='Enter Email'
                value={email}
                onChangeText={handleChange}
                keyboardType='email-address'
                style={styles.textInput}
                autoCapitalize='none'
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={handleAuth}
                activeOpacity={0.7}
                style={styles.googleButton}
              >
                <Text style={styles.textButton}>Send</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.verifyCode}>Verify Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
