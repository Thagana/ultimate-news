import Server from '../service/server';

export const getAllNews = async (page) => {
    try {
        const response = await Server.getHeadlines(page);
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
        const response = await Server.searchNews(query);
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
        return {
            success: false,
            data: []
        };
    }
}