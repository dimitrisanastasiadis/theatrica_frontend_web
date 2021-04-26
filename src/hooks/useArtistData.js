import useSWR from "swr"

function useArtistData(id){

    let { data: artist } = useSWR(`/people/${id}`);
    const { data: productions } = useSWR(() => `/people/${id}/productions`);

    if (artist){
      if (productions){
        artist.productions = productions.content;
      }
    }

    return artist;
}

export default useArtistData;