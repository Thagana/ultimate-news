import axios from "axios"
import Server from '../service/server';

export const getAllNews = async () => {
    try {
        const response = await Server.getHeadlines();
        if (response.status === 200) {
            const responseData = response.data;
            const { data, success } = responseData;
            if (success) {
                return {
                    success: true,
                    data,
                }
            }
            return {
                success: false,
                data: []
            }
        }
        
        return {
            success: false,
            data: []
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            data: []
        }
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