import axios from "axios"

// local server
// export const mainAxios = axios.create({
//     baseURL: process.env.NODE_ENV === "development" ? "http://192.168.2.14:5000/api" : "http://46.177.145.22:53239/api"
// })

export const mainAxios = axios.create({
    baseURL: "http://195.251.123.174:8080/api"
})

const tmdbAxios = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.TMDB_API
    }
})

const newsAxios = axios.create({
    baseURL: "https://newsapi.org/v2",
    params: {
        apiKey: process.env.NEWS_API
    }
})

export const newsFetcher = async url => {
    try{
        const response = await newsAxios.get(url);
        const data = response.data;
        return data;
    }catch(error){
        console.log(error)
    }
}



export const mainFetcher = async url => {
    try{
        const response = await mainAxios.get(url);
        const data = response.data.data;
        return data;
    }catch(error){
        console.log(error)
    }
}

export const internalFetcher = async (url, data) => {
    try{
        const response = await axios.post(url, data);
        const responseData = response.data;
        return responseData;
    }catch(error){
        console.log(error)
    }
}

export const internalFetcherGet = async (url, path, id) => {
    try{
        const response = await axios.get(url, {
            params: {
                path,
                id
            }
        });
        const data = response.data;
        return data;
    }catch(error){
        console.log(error)
    }
}

export const tmdbFetcher = async url => {
    try{
        const response = await tmdbAxios.get(url);
        const data = response.data;
        return data;
    }catch(error){
        console.log(error)
    }
}

