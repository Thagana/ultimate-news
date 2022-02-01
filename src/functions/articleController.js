import { AsyncStorage } from 'react-native';
// import { v4 as uuidv4 } from 'uuid';

export class Manager{
    constructor(source, title, image, description, author, datePosted){
        this.id = Math.random();
        this.source = source;
        this.image =  image;
        this.description = description;
        this.dateAdded = Date.now();
        this.datePosted = datePosted;
        this.author = author;
        this.title = title
    }
}

export class Store{
    static async getArticles(){
        let articles;
        if( await AsyncStorage.getItem('articles') === null){
            articles = []
        }else{
            articles = JSON.parse(await AsyncStorage.getItem('articles'))
        }
        return articles
    }
    static async addArticle(article){
        const articles = Store.getArticles();
        articles.then(data => {
            data.push(article);
            AsyncStorage.setItem('articles', JSON.stringify(data))
        }).catch(error => console.log(error));
    }
    static removeArticle(id){
        const articles = Store.getArticles();
        articles.then(data => {
            data.forEach((article, index) => {
                if(article.id === id){
                    data.splice(index, 1)
                }
            });
            AsyncStorage.setItem('articles', JSON.stringify(data));
        }).catch(error => console.log(error))
    }
    static async removeAllArticles(){
        try{
            await AsyncStorage.removeItem('articles')
        }catch(error){
            console.log(error);
        }
    }
}