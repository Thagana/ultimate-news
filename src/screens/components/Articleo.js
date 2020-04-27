import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

/** State Manager */
import { useStoreActions, useStoreState } from "easy-peasy";

/** Functions */
import { Store } from "../../functions/articleController";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const Article = (props) => {
  const removeAlrticle = useStoreActions((action) => action.removeArticle);
  const isDarkMode = useStoreState((state) => state.isDarkMode);

  return (
    <Card style={{ margin: 5, borderRadius: 10 }}>
      <Card.Title
        title={props.source}
        subtitle={moment(props.dateAdded, "YYYYMMDD").fromNow()}
        left={LeftContent}
      />
      <Card.Content>
        <Title>{props.title}</Title>
        <Paragraph>{props.description}</Paragraph>
      </Card.Content>
      <Card.Cover
        source={
          props.image === null
            ? require("../../assets/no_internet.png")
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
                removeAlrticle(props.id);
              }}
            >
              <AntDesign
                name="delete"
                size={25}
                color={isDarkMode ? "#fff" : "#000"}
              />
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
