import axios from "axios"
import Constants from 'expo-constants';


const NEWS_API = Constants.manifest.extra.G_NEWS_TOKEN;

export const getAllNews = () => {
    const COUNTRY = 'za';
    return axios.get(`https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${NEWS_API}`).then(response => {
        // console.log(`the: ${response}`)
        return response
    }).catch(error => error)
}
export const getSearchedNews = (query) => {
    return axios.get(`https://newsapi.org/v2/everything?q=+${query}&apiKey=${NEWS_API}`)
    .then(response => {
        return response
    }).catch(error => {
        return error
    })
}