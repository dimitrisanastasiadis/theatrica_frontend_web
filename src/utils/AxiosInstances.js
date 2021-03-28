import axios from "axios"

export const mainAxios = axios.create({
    baseURL: "http://192.168.2.10:8080/api"
})