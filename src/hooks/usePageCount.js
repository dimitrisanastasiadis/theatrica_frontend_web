import { useState, useEffect } from "react"
import axios from "axios"

function usePageCount(fetchURL, pageSize = 20) { 
    const [ pageCount, setPageCount ] = useState(0);

    useEffect(() => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();      
        
        const getPageCount = async () => {
          try{
            const response = await axios.get(fetchURL, {
              cancelToken: source.token
            })
            const items = response.data.data;
            setPageCount(Math.ceil(items.length / pageSize));
          }catch(error) {
            if (axios.isCancel(error)){
              console.log('Request canceled: ' + error);
            }
            else{
              console.log('Request failed: ' + error);
            }
          }
        }

        getPageCount();

        return () => {
          source.cancel();
        }
    },[fetchURL, pageSize])

    return pageCount;
}

export default usePageCount;