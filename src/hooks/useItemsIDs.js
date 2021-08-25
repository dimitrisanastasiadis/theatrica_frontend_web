import { useEffect, useState } from "react";
import useSWR from "swr"

function useItemsIDs(path, page, size) {
    const { data } = useSWR(`${path}?page=${page}&size=${size}`);
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (data){
            setItems(data.content);
            setTotalPages(data.totalPages);
        }
    }, [data])
    
    return {items, totalPages};
}

export default useItemsIDs;