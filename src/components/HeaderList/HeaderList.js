import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from "react-native-paper";
import * as Location from 'expo-location';
import { PropTypes } from 'prop-types';
import Server from '../../service/server';

import styles from './Header.style';

export default function HeaderList(props) {
    const { term, setTerm, navigation } = props;
    const [serverState, setServerState] = React.useState('IDLE');

    const mounted = React.useRef(true);
    
    const [weather, setWeather] = React.useState();

    const handleLocationCheck = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }  
      let location = await Location.getCurrentPositionAsync({});
      await reverseGeolocation(location);
    }

    const reverseGeolocation = async (location) => {
      try {
        const { latitude, longitude } = location.coords
        const response = await Server.weatherLocation({ latitude, longitude });
        if (response.status === 200) {
          const data = response.data.data;
          const { icon, temp, location, maxTemp, minTemp, description } = data;
          setWeather({ icon, temp, location, maxTemp, minTemp, description });
          setServerState('SUCCESS');
        }
      } catch (error) {
        console.log(error);
        setServerState('ERROR');
      }
    }

    const fetchWeather = async () => {
      try {
        setServerState('LOADING');
        const response = await Server.userWeatherLocation();
        if (response.status === 200) {
          const { message, success } = response.data;
          if (success) {
            const data = response.data.data;
            const { icon, temp, location, maxTemp, minTemp, description } = data;
            setWeather({ icon, temp, location, maxTemp, minTemp, description });
            setServerState('SUCCESS');
          }
          if (message === 'LOCATION_NOT_SET') {
              setServerState('SET_WEATHER');
          } else {
            setServerState('ERROR');
          }
        } else {
          setServerState('ERROR');
        }
      } catch (error) {
        console.log(error);
        setServerState('ERROR');
      }
    }

    React.useEffect(() => {
      if (mounted.current) {
        fetchWeather();
      }
    },[]);

    React.useEffect(() => {
      return () => {
        mounted.current = false;
      }
    },[])

    return (
        <>
        <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>
                U-News
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
          {serverState === 'LOADING' && <View style={[styles.weather, { backgroundColor: '#fff', justifyContent: 'center', height: 50, width: 380 }]}><Text>Loading</Text></View>}
          {serverState === 'SET_WEATHER' && <TouchableOpacity  onPress={handleLocationCheck} style={[styles.weather, { backgroundColor: '#fff', justifyContent: 'center', height: 50, width: 380 }]}><Text>SET LOCATION TO FETCH WEATHER</Text></TouchableOpacity>}
          {serverState === 'ERROR' && <TouchableOpacity onPress={handleLocationCheck} style={[styles.weather, { backgroundColor: '#fff', justifyContent: 'center', height: 50, width: 380 }]}><Text>ERROR LOADING WEATHER DATA</Text></TouchableOpacity>}
          {serverState === 'SUCCESS' &&           
              <TouchableOpacity  activeOpacity={0.7} onPress={handleLocationCheck} style={styles.weather}>
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
            </TouchableOpacity>
          }

    </>
    )
}

HeaderList.propTypes = {
  term: PropTypes.string,
  setTerm: PropTypes.func,
  navigation: PropTypes.object
}