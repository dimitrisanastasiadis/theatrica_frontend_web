import useSWR from "swr"

function useArtistData(id){

    const { data: artist } = useSWR(`/people/${id}`);
    const { data: productions } = useSWR(() => `/people/${id}/productions`);
    

    return {artist, productions};
}

export default useArtistData;