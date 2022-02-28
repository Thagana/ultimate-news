import Axios from './network';

class Server {
    static async login(token) {
        return Axios.post('/auth/login', { token })
    }
    static async checkToken(token) {
        return Axios.post('/auth/check', { token });
    }
    static async getSettings() {
        return Axios.get('/user/settings');
    }
    static async getHeadlines() {
        return Axios.get('/news/headlines');
    }
    static async weatherLocation(location) {
        const { longitude, latitude } = location;
        return Axios.post('/user/weather-location', { longitude: longitude, latitude: latitude });
    }
    static async userWeatherLocation() {
        return Axios.get('/user/user_weather');
    }
}

export default Server;