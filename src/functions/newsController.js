import axios from "axios"
import Constants from 'expo-constants';

export const getAllNews = async () => {
    const COUNTRY = 'za';
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${'35cf4cfccb8743cdbecd289312c5634d'}`);
        return response;
    } catch (error) {
        return error;
    }
}
export const getSearchedNews = async (query) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=+${query}&apiKey=${'35cf4cfccb8743cdbecd289312c5634d'}`);
        return response;
    } catch (error) {
        return error;
    }
}