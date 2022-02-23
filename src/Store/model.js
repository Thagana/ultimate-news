import { action, thunk } from 'easy-peasy';
import axios from 'axios';

export default {
    /* AUTHENTICATION */
    isAuth: false,
    token: '',
    setAuthenticated: action((state, payload) => {
        state.isAuth = true;
        state.token = payload;
    }),
    /* SETTINGS */
    location: 'Johannesburg',
    /* AUTHENTICATION */
    isDarkMode: false,
    articles: [],
    isLocal: true,
    /** Actions */
    addArticle: action((state, payload) => {
        state.articles.push(payload);
    }),
    removeArticle: action((state, payload) => {
        state.articles.forEach((article, index) => {
            if(article.id === payload){
                state.articles.splice(index, 1)
            }
        });
    }),
    removeAllArticles: action((state) => {
        state.articles = [];
    }),
    // Change The Theme
    toggleTheme: action((state, payload) => {
        state.isDarkMode = false;
    })

}