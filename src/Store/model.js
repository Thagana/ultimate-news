import { action } from 'easy-peasy';

export default {
    /* AUTHENTICATION */
    isAuth: false,
    token: '',
    setAuthenticated: action((state, payload) => {
        state.isAuth = true;
        state.token = payload;
    }),
    logOut: action((state) => {
        state.isAuth = false;
        state.token = '';
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
    toggleTheme: action((state) => {
        state.isDarkMode = false;
    })

}