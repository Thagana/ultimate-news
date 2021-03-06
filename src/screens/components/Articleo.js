import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import * as Linking from 'expo-linking';
import * as FileSystem from "expo-file-system";
import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { Manager, Store } from "../../functions/articleController";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const Article = (props) => {
  const { onDownload, url } = props;
  const addArt = useStoreActions((action) => action.addArticle);
  const isDarkMode = useStoreState((state) => state.isDarkMode);
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${props.title} | ${props.description} - ${props.url}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with type')
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Closed");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleVisit = async () => {
    Linking.openURL(url);
  };

  const donwloadFile = async (image) => {
    if (image !== null) {
      const fileUri = FileSystem.documentDirectory + Math.random() + ".jpg";
      let downloadObject = FileSystem.createDownloadResumable(image, fileUri);
      try {
        let response = await downloadObject.downloadAsync();
        if (response.status === 200) {
          const Article = new Manager(
            props.source.name,
            props.title,
            response.uri,
            props.description,
            props.author,
            props.publishedAt
          );
          Store.addArticle(Article);
          addArt(Article);
        } else {
          console.log("Something went wrong while downloading");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const Article = new Manager(
        props.source.name,
        props.title,
        null,
        props.description,
        props.author,
        props.publishedAt
      );
      Store.addArticle(Article);
      addArt(Article);
    }
  };

  const handleSave = async () => {
    try {
      //Download Images and save path
      await donwloadFile(props.image);
      onDownload('Downloaded');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card style={{ margin: 5, borderRadius: 10 }}>
      <Card.Title
        title={props.source.name}
        subtitle={moment(props.publishedAt, "YYYYMMDD").fromNow()}
        left={LeftContent}
      />
      <Card.Content>
        <Title>{props.title}</Title>
        <Paragraph>{props.description}</Paragraph>
      </Card.Content>
      <Card.Cover
        source={
          props.image === null
            ? require("../../assets/download.png")
            : { uri: props.image }
        }
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                handleShare();
              }}
            >
              <Entypo name="share" size={25} color="#3498db" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                handleSave();
              }}
            >
              <Entypo name="download" size={25} color="#3498db" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                handleVisit();
              }}
            >
              <Entypo name="globe" size={25} color="#3498db" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingRight: 6,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            >
              {props.author ? props.author : "Anonymous"}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default Article;
