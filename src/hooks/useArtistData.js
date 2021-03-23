import { useState, useEffect } from "react"
import axios from "axios"

function useArtistData(page, size = 10){
    const [ artistData, setArtistData ] = useState([]);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        setArtistData([]);

        const getData = async () => {
            try {
              const response = await axios.get(`http://192.168.2.10:8080/api/people?page=${page}&size=${size}`, {
                cancelToken: source.token
              });
              const artists = response.data.data;
              let responseProductions
              await Promise.all(
                  artists.map(async (artist, index) => {
                    responseProductions = await axios.get(`http://192.168.2.10:8080/api/people/${artist.id}/productions`, {
                      cancelToken: source.token
                    });
                    artists[index].productions = responseProductions.data.data;
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
        if (page){
            getData();
        }

        return () => {
            source.cancel();
        }
    }, [page, size])

    return artistData;
}

export default useArtistData;