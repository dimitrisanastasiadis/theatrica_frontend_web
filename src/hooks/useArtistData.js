import { mainAxios } from "../utils/AxiosInstances"
import useSWR from "swr"

const fetcher = async url => {
  const response = await mainAxios.get(url);
  const data = response.data.data;
  return data;
}

function useArtistData(id){

    let { data: artist } = useSWR(`/people/${id}`, fetcher);
    const { data: productions } = useSWR(() => `/people/${id}/productions`, fetcher);

    if (artist){
      if (productions){
        artist.productions = productions.content;
      }
    }

    return artist;
}

export default useArtistData;