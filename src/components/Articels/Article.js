import React from "react";
import { View, Text, TouchableOpacity, Share, Image } from "react-native";
import * as Linking from 'expo-linking';
import * as FileSystem from "expo-file-system";
import { useStoreActions, useStoreState } from "easy-peasy";
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import moment from "moment";
import { Manager, Store } from "../../functions/articleController";

import ImageView from '../ImageView';

import styles from './Article.style';

const Article = (props) => {
  const { onDownload, url, image, headerText, header, title, description, source } = props;
  const addArt = useStoreActions((action) => action.addArticle);
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${title} | ${description} - ${url}`,
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

  const downloadFile = async (image) => {
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
      await downloadFile(image);
      onDownload('Downloaded');
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <ImageView image={image} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {title}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {description}
          </Text>
        </View>
        <View style={styles.footer}>
          <View>
            <Text>{source.name} - {moment(props.publishedAt, "YYYYMMDD").fromNow()}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity 
                style={styles.icon}
                activeOpacity={0.8}
                >
              <AntDesign
                name="hearto" 
                size={24} 
                color="black" 
                />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.icon}
                activeOpacity={0.8}
                onPress={handleShare}
                >
              <AntDesign name="sharealt" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.icon}
                activeOpacity={0.8}
                onPress={handleSave}
                >
              <AntDesign name="download" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

export default Article;
