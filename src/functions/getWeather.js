import axios from 'axios';

const API_KEY = '93ed992c444c651119c49e43e921793a'

export const getWeather = async (cityName) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    if (response.status === 200) {
        return response.data
    }
    return false
}