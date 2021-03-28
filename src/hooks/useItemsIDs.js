import { mainAxios } from "../utils/AxiosInstances"
import useSWR from "swr"

const fetcher = async url => {
    const response = await mainAxios.get(url);
    const data = response.data.data;
    return data;
}

function useItemsIDs(path, page, size) {
    const { data } = useSWR(`${path}?page=${page}&size=${size}`, fetcher);
    let items, totalPages;

    if (data){
        items = data.content;
        totalPages = data.totalPages;
    }

    return {items, totalPages};
}

export default useItemsIDs;