import { useState, useEffect } from "react"
import axios from "axios"

function useArtistData(page, size = 10, id){
    const [ artistData, setArtistData ] = useState([]);
    let url = "";

    if(id) {
      url = `http://192.168.2.10:8080/api/people/${id}`
    }else {
      url = `http://192.168.2.10:8080/api/people?page=${page}&size=${size}`
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        setArtistData([]);

        const getData = async () => {
            try {
              const response = await axios.get(url, {
                cancelToken: source.token
              });
              const artists = (response.data.data.content) || [response.data.data];
              await Promise.all(
                  artists.map(async (artist, index) => {
                    const responseProductions = await axios.get(`http://192.168.2.10:8080/api/people/${artist.id}/productions`, {
                      cancelToken: source.token
                    });
                    artists[index].productions = responseProductions.data.data.content;
                  })
              )
              setArtistData(artists);
            } catch(error) {
              if (axios.isCancel(error)){
                console.log('Request canceled: ' + error);
              }
              else{
                console.log('Request failed: ' + error);
              }
            }
        }
        if (page !== undefined || id){
            getData();
        }


        return () => {
            source.cancel();
        }
    }, [page, size, url, id])

    return artistData;
}

export default useArtistData;