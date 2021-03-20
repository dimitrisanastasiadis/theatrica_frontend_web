import { useState, useEffect } from "react"
import axios from "axios"

function useArtistData(page, size = 10){
    const [ artistData, setArtistData ] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
              const response = await axios.get(`http://192.168.2.10:8080/api/people?page=${page}&size=${size}`);
              const artists = response.data.data;
              let responseProductions
              await Promise.all(
                  artists.map(async (artist, index) => {
                    responseProductions = await axios.get(`http://192.168.2.10:8080/api/people/${artist.id}/productions`);
                    artists[index].productions = responseProductions.data.data;
                  })
              )
              if (isMounted){
                setArtistData(artists);
              }
            } catch (error) {
              console.error(error);
            }
        }
        if (page){
            getData();
        }

        return () => {
            isMounted = false;
        }
    }, [page, size])

    return artistData;
}

export default useArtistData;