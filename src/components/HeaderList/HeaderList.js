import React from 'react'
import { View, Text } from 'react-native'

import styles from './Header.style';

export default function HeaderList(props) {
    const { term, setTerm, navigation, weather } = props;
    return (
        <>
        <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>
                Ultimate News
              </Text>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search"
              onChangeText={(term) => setTerm(term)}
              value={term}
              onFocus={() => navigation.navigate("Search")}
              style={styles.search}
            />
          </View>
          <View style={styles.weather}>
            <View style={styles.iconContainer}>
              <Image 
                source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }} 
                style={styles.weatherIcon} 
                />
            </View>
            <View>
              <View style={styles.temperatureHeader}>
                <View style={styles.itemsHeader}>
                  <Text>
                      {weather.temp} &deg;C
                  </Text>
                </View>
                <View style={styles.itemsHeader}>
                  <Text>
                      {weather.location}
                  </Text>
                </View>
                <View style={styles.itemsHeader}>
                  <Text>
                      {weather.minTemp} &deg;/{weather.maxTemp} &deg;
                  </Text>
                </View>
              </View>
              <View><Text>{weather.description}</Text></View>
            </View>
        </View>
    </>
    )
}
