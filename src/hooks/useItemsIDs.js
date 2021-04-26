import useSWR from "swr"

function useItemsIDs(path, page, size) {
    const { data } = useSWR(`${path}?page=${page}&size=${size}`);
    let items, totalPages;

    if (data){
        items = data.content;
        totalPages = data.totalPages;
    }

    return {items, totalPages};
}

export default useItemsIDs;