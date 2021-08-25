import { useEffect, useReducer } from "react"
import useSWR from "swr"
import DefaultImage from "../assets/img/DefaultShowImage.webp"

const initialData = {
    show: {},
    people: [],
    upcomingEvents: [],
    pastEvents: [],
    media: ""
  }
  
  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field] : value
    }
  }

function useShowData(id){
    const { data: show } = useSWR(`productions/${id}`);
    const { data: events } = useSWR(() => `productions/${id}/events`);
    const { data: people } = useSWR(() => `productions/${id}/people`);
    const [showData, dispatch] = useReducer(reducer, initialData);

    useEffect(() => {
        if (show){
            dispatch({field: "show", value: show});
    
            let media = DefaultImage;
    
            if (show.mediaURL){
                if (show.mediaURL.includes("viva")){
                    media = show.mediaURL;
                }
                if (show.mediaURL.includes("youtube") || show.mediaURL.includes("youtu.be")){
    
                    const i = show.mediaURL.indexOf("v=");
                    
                    if(i >= 0){
                        const videoID = show.mediaURL.slice(i + 2, i + 13);
                        media = `https://img.youtube.com/vi/${videoID}/maxres1.jpg`;
                    }
                }
            }
    
            dispatch({field: "media", value: media})
        }
    }, [show])

    useEffect(() => {
        if (events){
            let pastEvents = [];
            let upcomingEvents = [];
            events.forEach(event => {
                const date = new Date(event.date);
                event.stringDate = date.toLocaleDateString("el", {weekday: "long", day: "numeric", month: "long", year: "numeric"});
                event.time = date.toLocaleTimeString("el", {hour: "numeric", minute: "numeric", hour12: false});
                if (event.date > Date.now()){
                    upcomingEvents.push(event);
                }else{
                    pastEvents.push(event);
                }
            })
            pastEvents.sort((a, b) => {
                return b.date - a.date;
            })
            dispatch({field: "upcomingEvents", value: upcomingEvents});
            dispatch({field: "pastEvents", value: pastEvents});
        }
    }, [events])

    
    useEffect(() => {
        if (people){
            dispatch({field: "people", value: people});
        }
    }, [people])
    
    
    

    return showData;
}

export default useShowData;