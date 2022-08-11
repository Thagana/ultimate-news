import AsyncStorage from '@react-native-async-storage/async-storage';
// import { v4 as uuidv4 } from 'uuid';

export class Manager{
    public source: string;
    private static id: number;
    public image: string;
    public description: string;
    private static dateAdded: number;
    public author: string;
    public title: string;
    public datePosted: string;
    constructor(source: string, title: string, image: string, description: string, author: string, datePosted: string){
        Manager.id = Math.random();
        this.source = source;
        this.image =  image;
        this.description = description;
        Manager.dateAdded = Date.now();
        this.datePosted = datePosted;
        this.author = author;
        this.title = title
    }
}

export class Store {
    static async getArticles() {
        let articles;
        if( await AsyncStorage.getItem('articles') === null){
            articles = []
        }else{
            articles = JSON.parse(await AsyncStorage.getItem('articles') || '')
        }
        return articles
    }
    static async addArticle(article: any) {
        const articles = Store.getArticles();
        articles.then(data => {
            data.push(article);
            AsyncStorage.setItem('articles', JSON.stringify(data))
        }).catch(error => console.log(error));
    }
    static removeArticle(id: number) {
        const articles = Store.getArticles();
        articles.then(data => {
            data.forEach((article: any, index: number) => {
                if(article.id === id){
                    data.splice(index, 1)
                }
            });
            AsyncStorage.setItem('articles', JSON.stringify(data));
        }).catch(error => console.log(error))
    }
    static async removeAllArticles() {
        try{
            await AsyncStorage.removeItem('articles')
        }catch(error){
            console.log(error);
        }
    }
}