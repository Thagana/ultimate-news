import Axios from './network';

class Server {
    static async login(token) {
        return Axios.post('/auth/login', { token })
    }
}

export default Server;