import { Action, action } from "easy-peasy";

export interface Model {
  isAuth: boolean;
  token: string;
  setAuthenticated: Action<Model, string>;
  logOut: Action<Model>;
  location: string;
  isDarkMode: boolean;
  articles: any[];
  addArticle: Action<Model, any>;
  isLocal: boolean;
  removeArticle: Action<Model, any>;
  removeAllArticles: Action<Model>;
  toggleTheme: Action<Model>;
}

const state: Model = {
  /* AUTHENTICATION */
  isAuth: false,
  token: "",
  setAuthenticated: action((state, payload) => {
    state.isAuth = true;
    state.token = payload;
  }),
  logOut: action((state) => {
    state.isAuth = false;
    state.token = "";
  }),
  /* SETTINGS */
  location: "Johannesburg",
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
      if (article.id === payload) {
        state.articles.splice(index, 1);
      }
    });
  }),
  removeAllArticles: action((state) => {
    state.articles = [];
  }),
  // Change The Theme
  toggleTheme: action((state) => {
    state.isDarkMode = false;
  }),
};

export default state;