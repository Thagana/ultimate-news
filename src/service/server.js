import Axios from './network';

class Server {
    static async login(code) {
        return Axios.post('/auth/login', { code })
    }
    static async register(email) {
        return Axios.post('/auth/register', { email });
    }
    static async checkToken(token) {
        return Axios.post('/auth/check', { token });
    }
    static async getSettings() {
        return Axios.get('/user/settings');
    }
    static async getHeadlines(page = 1, size = 10) {
        return Axios.get(`/news/headlines?page=${page}&size=${size}`);
    }
    static async weatherLocation(location) {
        const { longitude, latitude } = location;
        return Axios.post('/user/weather-location', { longitude: longitude, latitude: latitude });
    }
    static async userWeatherLocation() {
        return Axios.get('/user/user_weather');
    }
    static async savePushToken(token, type) {
        return Axios.post('/user/push-token', { token, type });
    }
    static async searchNews(term) {
        return Axios.post('/news/search', { term });
    }
}

export default Server;