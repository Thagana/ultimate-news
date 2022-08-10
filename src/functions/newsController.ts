import Server from '../service/server';


/**
 * 
 * @param page the page number of the request
 * @param size the size of the data response
 * @returns Promise<boolean, any[]>
 */
export const getAllNews = async (page: number, size: number) => {
    try {
        const response = await Server.getHeadlines(page, size);
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
export const getSearchedNews = async (query: string) => {
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