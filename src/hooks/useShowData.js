import useSWR from "swr"
import DefaultImage from "../assets/img/DefaultShowImage.webp"

function useShowData(id){
    const { data: show } = useSWR(`productions/${id}`);
    const { data: events } = useSWR(() => `productions/${id}/events`);
    const { data: people } = useSWR(() => `productions/${id}/people`);

    if (show){
        show.upcomingEvents = [];
        show.pastEvents = [];
        if (events){
            events.forEach(event => {
                const date = new Date(event.date);
                event.stringDate = date.toLocaleDateString("el", {weekday: "long", day: "numeric", month: "long", year: "numeric"});
                event.time = date.toLocaleTimeString("el", {hour: "numeric", minute: "numeric", hour12: false});
                if (event.date > Date.now()){
                    show.upcomingEvents.push(event);
                }else{
                    show.pastEvents.push(event);
                }
            })
            show.pastEvents.sort((a, b) => {
                return b.date - a.date;
            })
        }
        if (people){
            show.people = people;
        }
        show.media = DefaultImage;
        if (show.mediaURL){
            if (show.mediaURL.includes("viva")){
                show.media = show.mediaURL;
            }
            if (show.mediaURL.includes("youtube") || show.mediaURL.includes("youtu.be")){

                const i = show.mediaURL.indexOf("v=");
                
                if(i >= 0){
                    const videoID = show.mediaURL.slice(i + 2, i + 13);
                    show.media = `https://img.youtube.com/vi/${videoID}/maxres1.jpg`;
                }
            }
        }
    }

    return show;
}

export default useShowData;