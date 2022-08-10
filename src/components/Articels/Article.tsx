import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import * as FileSystem from "expo-file-system";
import { useStoreActions } from "easy-peasy";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import * as WebBrowser from 'expo-web-browser';
import { PropTypes } from 'prop-types';

import { Manager, Store } from "../../functions/articleController";

import ImageView from '../ImageView';

import styles from './Article.style';

const Article = (props) => {
  const { item, onDownload, isDownload } = props;
  const { url, urlToImage, title, description, source, publishedAt, author } = item;

  const addArt = useStoreActions((action) => action.addArticle);
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${title} | ${description} - ${url}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // 
        } else {
          // 
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log("Closed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const downloadFile = async (image) => {
    if (image !== null) {
      const fileUri = FileSystem.documentDirectory + Math.random() + ".jpg";
      let downloadObject = FileSystem.createDownloadResumable(image, fileUri);
      try {
        const response = await downloadObject.downloadAsync();
        if (response.status === 200) {
          const Article = new Manager(
            source,
            title,
            response.uri,
            description,
            author,
            publishedAt
          );
          Store.addArticle(Article);
          addArt(Article);
        } else {
          //
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const Article = new Manager(
        source,
        title,
        null,
        description,
        author,
        publishedAt
      );
      Store.addArticle(Article);
      addArt(Article);
    }
  };

  const handleLinkNavigation = async (link) => {
    await WebBrowser.openBrowserAsync(link);
  }

  const handleSave = async () => {
    try {
      await downloadFile(urlToImage);
      onDownload('Downloaded');
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => {
          handleLinkNavigation(url);
        }}>
          <ImageView image={urlToImage} />
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
        <View style={styles.footer}>
          <View>
            <Text>{source} - {moment(publishedAt, "YYYYMMDD").fromNow()}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity 
                style={styles.icon}
                activeOpacity={0.8}
                onPress={handleShare}
                >
              <AntDesign name="sharealt" size={24} color="black" />
            </TouchableOpacity>
            {!isDownload && (
              <TouchableOpacity 
                  style={styles.icon}
                  activeOpacity={0.8}
                  onPress={handleSave}
                  >
                <AntDesign name="download" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
  );
};

Article.propTypes = {
  onDownload: PropTypes.func,
  item: PropTypes.any,
  isDownload: PropTypes.bool
}

export default Article;
