import { action } from 'easy-peasy';

export default{
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