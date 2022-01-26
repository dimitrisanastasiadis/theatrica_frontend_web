import axios from "axios"

// local server
// export const mainAxios = axios.create({
//     baseURL: "http://192.168.2.10:8080/api"
// })

export const mainAxios = axios.create({
    baseURL: "http://83.212.111.242:8080/api"
})

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