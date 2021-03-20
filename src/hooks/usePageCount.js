import { useState, useEffect } from "react"
import axios from "axios"

function usePageCount(fetchURL, pageSize = 20) { 
    const [ pageCount, setPageCount ] = useState(0);

    useEffect(() => {
        let isMounted = true;
        
        const getPageCount = async () => {
            try {
              const response = await axios.get(fetchURL);
              const items = response.data.data;
              if(isMounted){
                setPageCount(Math.ceil(items.length / pageSize));
              }
            } catch (error) {
              console.error(error);
            }
        }

        getPageCount();

        return () => {
            isMounted = false;
        }
    },[fetchURL, pageSize])

    return pageCount;
}

export default usePageCount;