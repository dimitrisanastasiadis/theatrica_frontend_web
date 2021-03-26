import axios from "axios"
import useSWR from "swr"

const artistFetcher = async url => {
  const response = await axios.get(url);
  const data = (response.data.data.content) || [response.data.data];
  await Promise.all(
    data.map(async (artist, index) => {
      const responseProductions = await axios.get(`http://192.168.2.10:8080/api/people/${artist.id}/productions`);
      data[index].productions = responseProductions.data.data.content;
    })
)
  return data;
}

function useArtistData(page, size = 10, id){
    let url = "";

    if(id) {
      url = `http://192.168.2.10:8080/api/people/${id}`
    }else {
      url = `http://192.168.2.10:8080/api/people?page=${page}&size=${size}`
    }

    const { data: artists } = useSWR(url, artistFetcher);

    return artists;
}

export default useArtistData;