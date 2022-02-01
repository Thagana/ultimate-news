import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import * as FileSystem from "expo-file-system";
import { useStoreActions } from "easy-peasy";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import * as WebBrowser from 'expo-web-browser';

import { Manager } from "../../functions/articleController";

import ImageView from '../ImageView';

import styles from './Article.style';
import getMimeType from "../../utils/getMimeType";

const Article = ({ item, downloaded }) => {
  const { url, urlToImage, title, description, source, publishedAt, author, name: filename } = item;
  const addArticle = useStoreActions((actions) => actions.addArticle);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title} | ${description} - ${url}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const downloadFile = async (image) => {
    if (image !== null) {
      const last = getMimeType(image);
      const name = Math.random() + '.' + last
      const fileUri = FileSystem.documentDirectory + name;
      let downloadObject = FileSystem.createDownloadResumable(image, fileUri);
      try {
        let response = await downloadObject.downloadAsync();
        if (response.status === 200) {
          const Article = new Manager(
            source.name,
            title,
            response.uri,
            description,
            author,
            publishedAt,
            name
          );
          addArticle(Article);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const Article = new Manager(
        source.name,
        title,
        null,
        description,
        author,
        publishedAt
      );
      addArticle(Article);
    }
  };

  const handleLinkNavigation = async (link) => {
    await WebBrowser.openBrowserAsync(link);
  }

  const handleSave = async () => {
    try {
      await downloadFile(urlToImage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => {
          handleLinkNavigation(url);
        }}>
          <ImageView image={urlToImage} downloaded={downloaded} name={filename}/>
        </TouchableOpacity>
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
        {!downloaded && (
            <View style={styles.footer}>
                <View>
                  <Text>{source.name} - {moment(publishedAt, "YYYYMMDD").fromNow()}</Text>
                </View>
                <View style={styles.iconContainer}>
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
          )}
      </View>
  );
};

export default Article;
